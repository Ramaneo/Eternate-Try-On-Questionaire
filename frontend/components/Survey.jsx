import React, { useEffect, useRef, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";
import toast from "react-hot-toast";

const Survey = ({ show, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [surveyData, setSurveyData] = useState({
    answer1: null,
    email: "",
    answer3: null,
  });

  if (!show) {
    return null;
  }
  const onSubmit = async () => {
    try {
      const docRef = await addDoc(
        collection(db, "popUpQuestionaire"),
        surveyData
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    toast.success("Thank you");
    onClose();
  };

  const handleNextStep = (step, data) => {
    setSurveyData((prevData) => ({ ...prevData, ...data }));
    setCurrentStep(step);
  };
  const PopupContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #faf7f0;
    z-index: 88;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    font-family: avenir;
    @media only screen and (max-width: 768px) {
      flex-direction: column;
    }
  `;

  const DiscountLabel = styled.div`
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #6b7773;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    font-weight: 500;
    text-align: center;
    line-height: 1.2;
    @media only screen and (max-width: 768px) {
      display: none;
    }
  `;

  const SurveyContainer = styled.div`
    flex: 1;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    text-align: left;
    @media only screen and (max-width: 768px) {
      padding: 30px;
    }
    @media only screen and (min-width: 768px) {
      justify-content: center;
      align-content: center;
    }
  `;

  const surveyContentStyle = {
    background: "white",
    padding: "40px",
    borderRadius: "8px",
    width: "100%",
    height: "100%",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const closeButtonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "5%",
    right: "5%",
    // transform: "translate(-50%, 0%)",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    // backgroundColor: "#ff6347", // Tomato color
    backgroundColor: "#6B7773",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "17px",
    fontWeight: 500,
    textAlign: "center",
    lineHeight: "1.2",
    cursor: "pointer",
  };

  const PopupImage = styled.div`
    flex: 1;
    background-image: ${currentStep == 1
      ? "url(https://cdn.shopify.com/s/files/1/0484/1429/4167/files/survey-1.jpg?v=1719846564)"
      : currentStep == 2
      ? "url(https://cdn.shopify.com/s/files/1/0484/1429/4167/files/survey-2.jpg?v=1719921531)"
      : "url(https://cdn.shopify.com/s/files/1/0484/1429/4167/files/survey-3.jpg?v=1719921521)"};
    height: 100%;
    width: 100%;
    background-size: cover;
    @media only screen and (max-width: 768px) {
      max-height: 250px;
      background-image: ${currentStep == 1
        ? "url(https://cdn.shopify.com/s/files/1/0484/1429/4167/files/survey-mobile-1.jpg?v=1720012907)"
        : currentStep == 2
        ? "url(https://cdn.shopify.com/s/files/1/0484/1429/4167/files/survey-mobile-2.jpg?v=1720012915)"
        : "url(https://cdn.shopify.com/s/files/1/0484/1429/4167/files/survey-mobile-3.jpg?v=1720012912)"};
    }
  `;

  const SurveyInner = styled.div`
    max-width: 500px;
    @media only screen and (min-width: 768px) {
      margin: auto;
    }
  `;

  return (
    <PopupContainer>
      {/* <div style={surveyContentStyle}>
        <h2>Survey</h2>
        <p>Please take a moment to complete our survey.</p>
        <button
          style={Object.assign({}, closeButtonStyle, closeButtonHoverStyle)}
          onClick={onClose}
        >
          Close
        </button>
      </div> */}
      <DiscountLabel>
        Get 50%
        <br />
        Off
      </DiscountLabel>
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          transform: "translate(-50%, 0%)",
          display: "flex",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 45,
            height: 45,
            background: "#6B7773",
            display: "flex",
            cursor: "pointer",
          }}
          onClick={() => {
            if (currentStep != 1) {
              setCurrentStep(currentStep - 1);
            }
          }}
        >
          <svg
            style={{ margin: "auto" }}
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="18"
            viewBox="0 0 9 18"
            fill="none"
          >
            <path
              d="M8.0498 16.92L1.5298 10.4C0.759804 9.62996 0.759804 8.36996 1.5298 7.59996L8.0498 1.07996"
              stroke="white"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            width: 45,
            height: 45,
            background: "#6B7773",
            display: "flex",
            cursor: "pointer",
          }}
          onClick={() => {
            if (currentStep == 1) {
              if (surveyData.answer1) {
                setCurrentStep(currentStep + 1);
              } else {
                toast.error("Please make a selection");
              }
            } else if (currentStep == 2) {
              if (surveyData.email) {
                setCurrentStep(currentStep + 1);
              } else {
                toast.error("Please write your email");
              }
            } else {
              if (surveyData.answer3) {
                onSubmit();
              } else {
                toast.error("Please make a selection");
              }
            }
          }}
        >
          <svg
            style={{ margin: "auto" }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8.95019 4.08004L15.4702 10.6C16.2402 11.37 16.2402 12.63 15.4702 13.4L8.9502 19.92"
              stroke="white"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div style={closeButtonStyle} onClick={() => onClose()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6.34326 17.6567L17.657 6.34303"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17.657 17.657L6.34326 6.34326"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <PopupImage>
        <span></span>
      </PopupImage>
      <SurveyContainer>
        <SurveyInner>
          <span style={{ fontWeight: 500, fontSize: 20, color: "black" }}>
            Congratulations on finding your forever love!
          </span>
          {currentStep === 1 && (
            <StepOne
              selectedItem={surveyData.answer1}
              onChange={(answer1) => {
                setSurveyData({ ...surveyData, answer1 });
              }}
              onNext={() => {
                setCurrentStep(2);
              }}
            />
          )}
          {currentStep === 2 && (
            <StepTwo
              onChange={(email) => {
                setSurveyData({ ...surveyData, email });
              }}
              onNext={() => {
                setCurrentStep(3);
              }}
              email={surveyData.email}
            />
          )}
          {currentStep === 3 && (
            <StepThree
              onChange={(answer3) => {
                setSurveyData({ ...surveyData, answer3 });
              }}
              onFinish={() => {
                onSubmit();
              }}
              selectedItem={surveyData.answer3}
            />
          )}
        </SurveyInner>
      </SurveyContainer>
    </PopupContainer>
  );
};

const SurveyItem = ({ numero, value, selected, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const surveyItemStyle = {
    border: `1px solid ${isHovered ? "black" : "#6B7773"}`,
    backgroundColor: selected ? "#6B7773" : "transparent",
    transition: ".3s all",
    maxWidth: 300,
    display: "flex",
    alignItems: "center",
    padding: 5,
    cursor: "pointer",
  };

  return (
    <div
      style={surveyItemStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        style={{
          width: 30,
          height: 30,
          backgroundColor: selected ? "white" : "rgb(107, 119, 115)",
          textAlign: "center",
          display: "flex",
        }}
      >
        <span
          style={{
            margin: "auto",
            color: selected ? "#6B7773" : "white",
          }}
        >
          {numero}
        </span>
      </div>
      <span
        style={{
          fontWeight: 500,
          marginLeft: 15,
          color: selected ? "white" : "#6B7773",
        }}
      >
        {value}
      </span>
    </div>
  );
};

const StepOne = ({ onNext, onChange, selectedItem }) => {
  // const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);

  return (
    <div id="step1">
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 40,
          fontSize: 17,
          fontWeight: 400,
          color: "black",
        }}
      >
        <span style={{ fontWeight: 500 }}>1</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M14.4299 5.93007L20.4999 12.0001L14.4299 18.0701"
            stroke="black"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.5 12L20.33 12"
            stroke="black"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span style={{}}>
          As you embark on this exciting chapter, we'd love to know - when are
          you planning your wedding celebration?
        </span>
      </div>
      <div
        style={{
          marginTop: 20,
          gap: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SurveyItem
          numero="A"
          value="ASAP"
          selected={selectedItem === "A"}
          onClick={() => {
            // setSelectedItem("A");
            onChange("A");
          }}
        />
        <SurveyItem
          numero="B"
          value="Within 3 Months"
          selected={selectedItem === "B"}
          onClick={() => {
            // setSelectedItem("B");
            onChange("B");
          }}
        />
        <SurveyItem
          numero="C"
          value="3-6 Months"
          selected={selectedItem === "C"}
          onClick={() => {
            // setSelectedItem("C");
            onChange("C");
          }}
        />
        <SurveyItem
          numero="D"
          value="6-12 Months"
          selected={selectedItem === "D"}
          onClick={() => {
            // setSelectedItem("D");
            onChange("D");
          }}
        />
        <SurveyItem
          numero="E"
          value="Not really sure!"
          selected={selectedItem === "E"}
          onClick={() => {
            // setSelectedItem("E");
            onChange("E");
          }}
        />
        <div style={{ display: "flex", marginTop: 20 }}>
          <div
            style={{
              background: "#6B7773",
              color: "white",
              padding: "5px 20px",
              cursor: "pointer",
            }}
            onClick={() =>
              selectedItem
                ? onNext(selectedItem)
                : toast.error("Please make a selection")
            }
          >
            <span style={{}}>OK</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const StepTwo = ({ onNext, onChange, email }) => {
  // const [email, setEmail] = useState(null);

  const Input = styled.input`
    border: none;
    border-bottom: 1px solid #3e392d;
    background: transparent;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  `;

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div id="step2">
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 40,
          fontSize: 17,
          fontWeight: 400,
          color: "black",
        }}
      >
        <span style={{ fontWeight: 500 }}>2</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M14.4299 5.93007L20.4999 12.0001L14.4299 18.0701"
            stroke="black"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.5 12L20.33 12"
            stroke="black"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span style={{}}>What’s your email address?</span>
      </div>
      <div
        style={{
          marginTop: 20,
          gap: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Input
          type="email"
          placeholder="name@example.com"
          value={email}
          ref={inputRef}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        <div style={{ display: "flex", marginTop: 20 }}>
          <div
            style={{
              background: "#6B7773",
              color: "white",
              padding: "5px 20px",
              cursor: "pointer",
            }}
            onClick={() =>
              email ? onNext(email) : toast.error("Please write your email")
            }
          >
            <span style={{}}>OK</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const StepThree = ({ onFinish, onChange, selectedItem }) => {
  // const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div id="step3">
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 40,
          fontSize: 17,
          fontWeight: 400,
          color: "black",
        }}
      >
        <span style={{ fontWeight: 500 }}>3</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M14.4299 5.93007L20.4999 12.0001L14.4299 18.0701"
            stroke="black"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.5 12L20.33 12"
            stroke="black"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span style={{}}>Which newsletter would you like to receive?</span>
      </div>
      <div
        style={{
          marginTop: 20,
          gap: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SurveyItem
          numero="A"
          value="All of them"
          selected={selectedItem === "A"}
          onClick={() => {
            onChange("A");
          }}
        />
        <SurveyItem
          numero="B"
          value="Only educational stuff"
          selected={selectedItem === "B"}
          onClick={() => {
            onChange("B");
          }}
        />
        <SurveyItem
          numero="C"
          value="Only editorial stuff"
          selected={selectedItem === "C"}
          onClick={() => {
            onChange("C");
          }}
        />
        <div style={{ display: "flex", marginTop: 20 }}>
          <div
            style={{
              background: "#6B7773",
              color: "white",
              padding: "5px 20px",
              cursor: "pointer",
            }}
            onClick={() =>
              selectedItem
                ? onFinish(selectedItem)
                : toast.error("Please make a selection")
            }
          >
            <span style={{}}>OK</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;
