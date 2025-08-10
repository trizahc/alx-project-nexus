// components/common/Spinner.tsx
export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-6 h-6 border-4 border-t-transparent border-green-600 rounded-full animate-spin"></div>
    </div>
  );
}
