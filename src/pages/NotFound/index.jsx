import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-600 text-white supports-[min-height:100svh]:min-h-[100svh]">
      <div className="absolute left-1/2 top-1/2 w-11/12 max-w-[80ch] -translate-x-1/2 -translate-y-1/2 space-y-6 text-center">
        <h1 className="text-2xl font-medium md:text-3xl lg:text-4xl">
          Oops! You&apos;ve wandered into the abyss of the internet. This page
          seems to have taken a vacation.
        </h1>
        <p>
          Ready to find your way back? Click{" "}
          <Link className="underline underline-offset-2" to="/">
            here
          </Link>{" "}
          to return to the comforts of home.
        </p>
      </div>
    </div>
  );
}
