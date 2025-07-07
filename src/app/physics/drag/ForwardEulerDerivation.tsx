"use client";
import { useState } from "react";
import Block from "@/components/Block";
import Emphasize from "@/components/Emphasize";

// --- Types ---
type Piece =
  | "x_next"
  | "x_current"
  | "v_current"
  | "delta_t"
  | "v_next"
  | "a_current";
type DropZoneId = "left" | "right1" | "right2" | "right3";
type DragSource = DropZoneId | "bank";
type ValidationState = "correct" | "incorrect" | "none";

interface FormulaState {
  left: Piece | null;
  right1: Piece | null;
  right2: Piece | null;
  right3: Piece | null;
}

const pieceContent: { [key in Piece]: string } = {
  x_next: "xₙ₊₁",
  x_current: "xₙ",
  v_current: "vₙ",
  delta_t: "Δt",
  v_next: "vₙ₊₁",
  a_current: "aₙ",
};

// --- Draggable Piece (for the bank) ---
const DraggablePiece: React.FC<{
  piece: Piece;
  onDragStart: (e: React.DragEvent, piece: Piece) => void;
}> = ({ piece, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, piece)}
      className="px-4 py-2 m-1 bg-blue-500 text-white rounded-md cursor-grab active:cursor-grabbing font-mono text-xl"
    >
      {pieceContent[piece]}
    </div>
  );
};

// --- Drop Target (for the formula slots) ---
const DropTarget: React.FC<{
  zoneId: DropZoneId;
  piece: Piece | null;
  onDrop: (zoneId: DropZoneId) => void;
  onDragStart: (
    e: React.DragEvent,
    piece: Piece,
    sourceZone: DropZoneId
  ) => void;
  validationState: ValidationState;
}> = ({ zoneId, piece, onDrop, onDragStart, validationState }) => {
  const [isOver, setIsOver] = useState(false);

  const getBorderStyle = () => {
    if (validationState === "correct") {
      return "border-solid";
    }
    return "border-dashed";
  };

  const validationStyles = {
    none: "border-slate-400 bg-slate-100",
    correct: "border-green-500 bg-green-100",
    incorrect: "border-red-500 bg-red-100",
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => setIsOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    onDrop(zoneId);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-24 h-16 flex items-center justify-center rounded-lg border-2 ${getBorderStyle()} transition-colors ${
        isOver ? "bg-sky-200 border-sky-500" : validationStyles[validationState]
      }`}
    >
      {piece ? (
        <div
          draggable
          onDragStart={(e) => onDragStart(e, piece, zoneId)}
          className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing font-mono text-2xl"
        >
          {pieceContent[piece]}
        </div>
      ) : (
        <span className="text-slate-400">Drop</span>
      )}
    </div>
  );
};

// --- Velocity Derivation Component ---
const VelocityDerivation: React.FC = () => {
  const initialPieces: Piece[] = [
    "v_next",
    "v_current",
    "a_current",
    "delta_t",
  ];
  const [bankPieces, setBankPieces] = useState<Piece[]>(initialPieces);
  const [formula, setFormula] = useState<FormulaState>({
    left: null,
    right1: null,
    right2: null,
    right3: null,
  });

  const [draggedPiece, setDraggedPiece] = useState<Piece | null>(null);
  const [dragSource, setDragSource] = useState<DragSource | null>(null);

  const handleDragStart = (
    e: React.DragEvent,
    piece: Piece,
    source: DragSource
  ) => {
    e.dataTransfer.setData("text/plain", piece);
    setDraggedPiece(piece);
    setDragSource(source);
  };

  const handleDropOnZone = (targetZoneId: DropZoneId) => {
    if (!draggedPiece || !dragSource) return;
    if (dragSource === targetZoneId) return; // Dropping on itself

    const pieceInTarget = formula[targetZoneId];
    const newFormula = { ...formula };

    // Place dragged piece in the target zone
    newFormula[targetZoneId] = draggedPiece;

    if (dragSource === "bank") {
      // Piece came from the bank
      setBankPieces(bankPieces.filter((p) => p !== draggedPiece));
      if (pieceInTarget) {
        // Target had a piece, move it back to the bank
        setBankPieces((prev) => [...prev, pieceInTarget]);
      }
    } else {
      // Piece came from another zone, so we swap
      newFormula[dragSource] = pieceInTarget;
    }

    setFormula(newFormula);
    setDraggedPiece(null);
    setDragSource(null);
  };

  const handleDropOnBank = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedPiece || dragSource === "bank") return;

    // Remove piece from its formula slot
    const newFormula = { ...formula };
    newFormula[dragSource as DropZoneId] = null;
    setFormula(newFormula);

    // Add piece back to the bank
    setBankPieces((prev) => [...prev, draggedPiece]);

    setDraggedPiece(null);
    setDragSource(null);
  };

  const allSlotsFilled = Object.values(formula).every((p) => p !== null);

  // Overall correctness check for velocity
  const isCorrect =
    allSlotsFilled &&
    formula.left === "v_next" &&
    formula.right1 === "v_current" &&
    ((formula.right2 === "a_current" && formula.right3 === "delta_t") ||
      (formula.right2 === "delta_t" && formula.right3 === "a_current"));

  // Granular validation for individual slot feedback
  const getValidationState = (zoneId: DropZoneId): ValidationState => {
    if (!allSlotsFilled) return "none";

    const piece = formula[zoneId];
    if (piece === null) return "incorrect";

    switch (zoneId) {
      case "left":
        return piece === "v_next" ? "correct" : "incorrect";
      case "right1":
        return piece === "v_current" ? "correct" : "incorrect";
      case "right2":
      case "right3": {
        const isAValidMultiplicationTerm =
          piece === "a_current" || piece === "delta_t";
        const areMultiplicationTermsUnique = formula.right2 !== formula.right3;

        return isAValidMultiplicationTerm && areMultiplicationTermsUnique
          ? "correct"
          : "incorrect";
      }
      default:
        return "none";
    }
  };

  return (
    <div className="my-6 p-4 bg-slate-200 rounded-lg flex flex-col items-center gap-y-4">
      {/* Equation display */}
      <div className="flex items-center justify-center flex-wrap gap-x-2 text-2xl font-mono">
        <DropTarget
          zoneId="left"
          onDrop={handleDropOnZone}
          piece={formula.left}
          onDragStart={(e, p, s) => handleDragStart(e, p, s)}
          validationState={getValidationState("left")}
        />
        <span className="font-bold text-2xl mx-1">=</span>
        <DropTarget
          zoneId="right1"
          onDrop={handleDropOnZone}
          piece={formula.right1}
          onDragStart={(e, p, s) => handleDragStart(e, p, s)}
          validationState={getValidationState("right1")}
        />
        <span className="font-bold text-2xl mx-1">+</span>
        <DropTarget
          zoneId="right2"
          onDrop={handleDropOnZone}
          piece={formula.right2}
          onDragStart={(e, p, s) => handleDragStart(e, p, s)}
          validationState={getValidationState("right2")}
        />
        <span className="font-bold text-2xl mx-1">*</span>
        <DropTarget
          zoneId="right3"
          onDrop={handleDropOnZone}
          piece={formula.right3}
          onDragStart={(e, p, s) => handleDragStart(e, p, s)}
          validationState={getValidationState("right3")}
        />
      </div>

      {/* Feedback Messages */}
      <div className="h-12 mt-2 mb-6">
        {allSlotsFilled && isCorrect && (
          <div className="p-3 text-center bg-green-100 text-green-800 rounded-lg">
            <Emphasize>Excellent!</Emphasize> You've also derived the velocity
            update rule. The next velocity is the current velocity plus the
            current acceleration times the timestep.
          </div>
        )}
        {allSlotsFilled && !isCorrect && (
          <div className="p-3 text-center bg-red-100 text-red-800 rounded-lg">
            <Emphasize>Not quite right.</Emphasize> Check the highlighted boxes.
          </div>
        )}
      </div>

      {/* Piece bank */}
      <div
        className="flex flex-wrap justify-center p-4 border-t-2 border-slate-300 w-full min-h-[6rem]"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropOnBank}
      >
        {bankPieces.map((p) => (
          <DraggablePiece
            key={p}
            piece={p}
            onDragStart={(e, piece) => handleDragStart(e, piece, "bank")}
          />
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---
export const ForwardEulerDerivation: React.FC = () => {
  const initialPieces: Piece[] = [
    "x_next",
    "x_current",
    "v_current",
    "delta_t",
  ];
  const [bankPieces, setBankPieces] = useState<Piece[]>(initialPieces);
  const [formula, setFormula] = useState<FormulaState>({
    left: null,
    right1: null,
    right2: null,
    right3: null,
  });

  const [draggedPiece, setDraggedPiece] = useState<Piece | null>(null);
  const [dragSource, setDragSource] = useState<DragSource | null>(null);

  const handleDragStart = (
    e: React.DragEvent,
    piece: Piece,
    source: DragSource
  ) => {
    e.dataTransfer.setData("text/plain", piece);
    setDraggedPiece(piece);
    setDragSource(source);
  };

  const handleDropOnZone = (targetZoneId: DropZoneId) => {
    if (!draggedPiece || !dragSource) return;
    if (dragSource === targetZoneId) return; // Dropping on itself

    const pieceInTarget = formula[targetZoneId];
    const newFormula = { ...formula };

    // Place dragged piece in the target zone
    newFormula[targetZoneId] = draggedPiece;

    if (dragSource === "bank") {
      // Piece came from the bank
      setBankPieces(bankPieces.filter((p) => p !== draggedPiece));
      if (pieceInTarget) {
        // Target had a piece, move it back to the bank
        setBankPieces((prev) => [...prev, pieceInTarget]);
      }
    } else {
      // Piece came from another zone, so we swap
      newFormula[dragSource] = pieceInTarget;
    }

    setFormula(newFormula);
    setDraggedPiece(null);
    setDragSource(null);
  };

  const handleDropOnBank = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedPiece || dragSource === "bank") return;

    // Remove piece from its formula slot
    const newFormula = { ...formula };
    newFormula[dragSource as DropZoneId] = null;
    setFormula(newFormula);

    // Add piece back to the bank
    setBankPieces((prev) => [...prev, draggedPiece]);

    setDraggedPiece(null);
    setDragSource(null);
  };

  const allSlotsFilled = Object.values(formula).every((p) => p !== null);

  // Overall correctness check
  const isCorrect =
    allSlotsFilled &&
    formula.left === "x_next" &&
    formula.right1 === "x_current" &&
    ((formula.right2 === "v_current" && formula.right3 === "delta_t") ||
      (formula.right2 === "delta_t" && formula.right3 === "v_current"));

  // Granular validation for individual slot feedback
  const getValidationState = (zoneId: DropZoneId): ValidationState => {
    if (!allSlotsFilled) return "none";

    const piece = formula[zoneId];
    if (piece === null) return "incorrect"; // Should not happen if allSlotsFilled is true

    switch (zoneId) {
      case "left":
        return piece === "x_next" ? "correct" : "incorrect";
      case "right1":
        return piece === "x_current" ? "correct" : "incorrect";
      case "right2":
      case "right3": {
        // A piece in a multiplication slot is valid if it's one of the multiplication terms...
        const isAValidMultiplicationTerm =
          piece === "v_current" || piece === "delta_t";
        // ...and the two multiplication slots don't contain the same piece.
        const areMultiplicationTermsUnique = formula.right2 !== formula.right3;

        return isAValidMultiplicationTerm && areMultiplicationTermsUnique
          ? "correct"
          : "incorrect";
      }
      default:
        return "none";
    }
  };

  return (
    <Block color="yellow" title="Derive the Forward Euler Formula">
      <p>
        Based on the diagram from the previous slide, drag and drop the pieces
        to construct the formula for the Forward Euler method.
      </p>
      <div className="my-6 p-4 bg-slate-200 rounded-lg flex flex-col items-center gap-y-4">
        {/* Equation display */}
        <div className="flex items-center justify-center flex-wrap gap-x-2 text-2xl font-mono">
          <DropTarget
            zoneId="left"
            onDrop={handleDropOnZone}
            piece={formula.left}
            onDragStart={(e, p, s) => handleDragStart(e, p, s)}
            validationState={getValidationState("left")}
          />
          <span className="font-bold text-2xl mx-1">=</span>
          <DropTarget
            zoneId="right1"
            onDrop={handleDropOnZone}
            piece={formula.right1}
            onDragStart={(e, p, s) => handleDragStart(e, p, s)}
            validationState={getValidationState("right1")}
          />
          <span className="font-bold text-2xl mx-1">+</span>
          <DropTarget
            zoneId="right2"
            onDrop={handleDropOnZone}
            piece={formula.right2}
            onDragStart={(e, p, s) => handleDragStart(e, p, s)}
            validationState={getValidationState("right2")}
          />
          <span className="font-bold text-2xl mx-1">*</span>
          <DropTarget
            zoneId="right3"
            onDrop={handleDropOnZone}
            piece={formula.right3}
            onDragStart={(e, p, s) => handleDragStart(e, p, s)}
            validationState={getValidationState("right3")}
          />
        </div>

        {/* Feedback Messages */}
        <div className="h-12 mt-2 mb-6">
          {allSlotsFilled && isCorrect && (
            <div className="p-3 text-center bg-green-100 text-green-800 rounded-lg">
              <Emphasize>Correct!</Emphasize> You've derived the Forward Euler
              formula: the next position is the current position plus the
              current velocity times the timestep.
            </div>
          )}
          {allSlotsFilled && !isCorrect && (
            <div className="p-3 text-center bg-red-100 text-red-800 rounded-lg">
              <Emphasize>Not quite right.</Emphasize> The highlighted boxes are
              in the wrong place. Try swapping them or dragging them back to the
              bank.
            </div>
          )}
        </div>

        {/* Piece bank */}
        <div
          className="flex flex-wrap justify-center p-4 border-t-2 border-slate-300 w-full min-h-[6rem]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropOnBank}
        >
          {bankPieces.map((p) => (
            <DraggablePiece
              key={p}
              piece={p}
              onDragStart={(e, piece) => handleDragStart(e, piece, "bank")}
            />
          ))}
        </div>
      </div>
      <p>
        We also have to figure out how to update our velocity value. Drag and
        drop the pieces below to derive how we should update the velocity
        formula.
      </p>
      <VelocityDerivation />
    </Block>
  );
};
