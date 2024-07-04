import React, { useState, useEffect } from "react";
import Survey from "./Survey";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [showSurvey, setShowSurvey] = useState(false);

  useEffect(() => {
    // Show the survey popup when the component mounts
    setShowSurvey(true);
  }, []);

  const handleCloseSurvey = () => {
    setShowSurvey(false);
  };

  return (
    <div className="App">
      <section className="product-section">
        {/* Your existing product grid code */}
      </section>
      <div>
        <Toaster />
      </div>
      <Survey show={showSurvey} onClose={handleCloseSurvey} />
    </div>
  );
};

export default App;
