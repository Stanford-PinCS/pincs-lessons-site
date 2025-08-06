export default function Placeholder({ name }: { name: string }) {
  return (
    <div className="w-full h-[200px] bg-gray-400 flex items-center justify-center">
      <h1 className="text-white">Placeholder: {name}</h1>
    </div>
  );
}
