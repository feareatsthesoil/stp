"use client";

export default function DonateButton() {
  return (
    <button
      type="button"
      className="w-15 text-md float-left h-8 rounded-md bg-[#e5e6e6] px-3 font-sans font-normal text-[#4a4d50] hover:bg-[#eff0f0]"
      onClick={() =>
        window.open(
          "https://donate.stripe.com/test_dR6cNJdBy2vY7kY6oo",
          "_blank"
        )
      }
    >
      Donate
    </button>
  );
}
