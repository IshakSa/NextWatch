import React from "react";

export default function Footer() {
  return (
    <footer className="border-t-2 mt-40 py-20 px-25">
      <div className="container">
        <div className="flex justify-between">
          <h1 className="pb-10 w-1/2">
            No more endless searching. Scroll through personalized
            recommendations, discover hidden gems, and save your favorites.
          </h1>
          <div> Home / Discover / Influence / Release</div>
        </div>

        <div className="flex justify-between">
          <div className="flex space-x-5">
            <p>Privacy policy</p>

            <p>Terms of service</p>

            <p>Privacy</p>
          </div>

          <p>©2026 MyApp</p>
        </div>
      </div>
    </footer>
  );
}
