"use client";
import { useState } from "react";
import Emphasize from "@/components/Emphasize";

// --- Types ---
type Piece = "Fx" | "Fy" | "F" | "cos_theta" | "sin_theta";
type DropZoneId = "left" | "right1" | "right2"; // Fx = F * cos(theta) or Fy = F * sin(theta)
type DragSource = DropZoneId | "bank";
type ValidationState = "correct" | "incorrect" | "none";

interface FormulaState {
  left: Piece | null;
  right1: Piece | null;
  right2: Piece | null;
}

const pieceContent: { [key in Piece]: string } = {
  Fx: "Fₓ",
  Fy: "Fᵧ",
  F: "F",
  cos_theta: "cos(θ)",
  sin_theta: "sin(θ)",
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

// --- Fx Derivation Component ---
const FxDerivation: React.FC = () => {
  const initialPieces: Piece[] = ["F", "cos_theta", "Fx", "sin_theta"];
  const [bankPieces, setBankPieces] = useState<Piece[]>(initialPieces);
  const [formula, setFormula] = useState<FormulaState>({
    left: null,
    right1: null,
    right2: null,
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

  // Overall correctness check for Fx
  const isCorrect =
    allSlotsFilled &&
    formula.left === "Fx" &&
    ((formula.right1 === "F" && formula.right2 === "cos_theta") ||
      (formula.right1 === "cos_theta" && formula.right2 === "F"));

  // Granular validation for individual slot feedback
  const getValidationState = (zoneId: DropZoneId): ValidationState => {
    if (!allSlotsFilled) return "none";

    const piece = formula[zoneId];
    if (piece === null) return "incorrect";

    switch (zoneId) {
      case "left":
        return piece === "Fx" ? "correct" : "incorrect";
      case "right1":
      case "right2": {
        const isAValidMultiplicationTerm =
          piece === "F" || piece === "cos_theta";
        const areMultiplicationTermsUnique = formula.right1 !== formula.right2;

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
      <h3 className="text-xl font-bold">Derive Fₓ</h3>
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
        <span className="font-bold text-2xl mx-1">*</span>
        <DropTarget
          zoneId="right2"
          onDrop={handleDropOnZone}
          piece={formula.right2}
          onDragStart={(e, p, s) => handleDragStart(e, p, s)}
          validationState={getValidationState("right2")}
        />
      </div>

      {/* Feedback Messages */}
      <div className="h-12 mt-2 mb-6">
        {allSlotsFilled && isCorrect && (
          <div className="p-3 text-center bg-green-100 text-green-800 rounded-lg">
            <Emphasize>Excellent!</Emphasize> You've correctly derived the
            formula for the x-component of force: Fₓ = F * cos(θ).
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

// --- Fy Derivation Component ---
const FyDerivation: React.FC = () => {
  const initialPieces: Piece[] = ["F", "sin_theta", "Fy", "cos_theta"];
  const [bankPieces, setBankPieces] = useState<Piece[]>(initialPieces);
  const [formula, setFormula] = useState<FormulaState>({
    left: null,
    right1: null,
    right2: null,
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

  // Overall correctness check for Fy
  const isCorrect =
    allSlotsFilled &&
    formula.left === "Fy" &&
    ((formula.right1 === "F" && formula.right2 === "sin_theta") ||
      (formula.right1 === "sin_theta" && formula.right2 === "F"));

  // Granular validation for individual slot feedback
  const getValidationState = (zoneId: DropZoneId): ValidationState => {
    if (!allSlotsFilled) return "none";

    const piece = formula[zoneId];
    if (piece === null) return "incorrect";

    switch (zoneId) {
      case "left":
        return piece === "Fy" ? "correct" : "incorrect";
      case "right1":
      case "right2": {
        const isAValidMultiplicationTerm =
          piece === "F" || piece === "sin_theta";
        const areMultiplicationTermsUnique = formula.right1 !== formula.right2;

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
      <h3 className="text-xl font-bold">Derive Fᵧ</h3>
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
        <span className="font-bold text-2xl mx-1">*</span>
        <DropTarget
          zoneId="right2"
          onDrop={handleDropOnZone}
          piece={formula.right2}
          onDragStart={(e, p, s) => handleDragStart(e, p, s)}
          validationState={getValidationState("right2")}
        />
      </div>

      {/* Feedback Messages */}
      <div className="h-12 mt-2 mb-6">
        {allSlotsFilled && isCorrect && (
          <div className="p-3 text-center bg-green-100 text-green-800 rounded-lg">
            <Emphasize>Excellent!</Emphasize> You've correctly derived the
            formula for the y-component of force: Fᵧ = F * sin(θ).
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
export const ForceComponentDerivation: React.FC = () => {
  return (
    <>
      <FxDerivation />
      <FyDerivation />
    </>
  );
};
