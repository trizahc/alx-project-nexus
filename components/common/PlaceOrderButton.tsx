// components/common/PlaceOrderButton.tsx
interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export default function PlaceOrderButton({ onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      Place Order
    </button>
  );
}
