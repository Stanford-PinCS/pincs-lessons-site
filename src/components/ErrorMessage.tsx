import Text from "@/components/Text";

export default function ErrorMessage({
  message,
  pulsing = false,
}: {
  message: string;
  pulsing?: boolean;
}) {
  return (
    <div
      className={`bg-red-500 m-4 p-4 rounded-md text-white ${
        pulsing ? "animate-pulse" : ""
      }`}
    >
      <Text>{message}</Text>
    </div>
  );
}
