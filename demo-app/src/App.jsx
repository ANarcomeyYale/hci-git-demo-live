import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

const user = {
  name: 'Austin Narcomey',
}

// DONT DO THIS
// let custom_flag = true;
// let description;
// if (custom_flag) {
//   description = <p>Custom flag is on</p>;
// } else {
//   description = <p>Custom flag is off</p>;
// }

function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

function AlertButton() {
  function handleClick() {
    const firstName = user.name.split(' ')[0]; // Parse the first name
    //debugger
    //console.log("First name:", firstName); // Log the first name to the console
    alert("Hello, " + firstName); // Set the alert
  }
  
  return (
    <button onClick={handleClick}>
      Click for Alert
    </button>
  );
}

function AlertButtonContainer() {
  return (
    <div>
      <p>1. Handling On Click Events:</p>
      <AlertButton />
    </div>
  )
}

function ToggleButtonContainer({ description, customFlag, setCustomFlag }) {
  function handleClick() {
    //custom_flag = !custom_flag; // Fail! to toggle the flag
    setCustomFlag(!customFlag); // Properly toggle the flag using state
  }

  return (
    <div>
      <p>{description}</p>
      <button onClick={handleClick}>
        Toggle Custom Flag
      </button>
    </div>
  )

}

function CounterButton({sleepy=false}) {
  const [count, setCount] = useState(0);

  // Sleep function using a Promise
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function handleClick() {
    if (sleepy) {
      await sleep(2000);
    }
    
    //setCount(count + 1); // Increment the count
    setCount((prevCount) => prevCount + 1); // Properly update the count using the previous state
  }

  return (
    <div>
      <button onClick={handleClick}>
        Clicked {count} times
      </button>
    </div>
  );
  
}

function SharedCounterButton({ sharedCount, setSharedCount }) {
  function handleClick() {
    setSharedCount((prevCount) => prevCount + 1); // Increment the shared count
  }
  
  return (
    <button onClick={handleClick}>
      Shared Clicks: {sharedCount}
    </button>
  );
}

function ColorChanger() {
  const [textColor, setTextColor] = useState('white');

  return (
    <div>
      <p style={{ color: textColor, transition: 'color 0.3s ease' }}>
        Watch my color change!
      </p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={() => setTextColor('white')}>White</button>
        <button onClick={() => setTextColor('#61dafb')}>Blue</button>
        <button onClick={() => setTextColor('#ff6b6b')}>Red</button>
      </div>
    </div>
  );
}

function FleeingButton() {
  // State to hold our X and Y coordinates. We start at 0,0 (center).
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleHover() {
    // Generate random distances between -100px and +100px
    const randomX = Math.floor(Math.random() * 200) - 100;
    const randomY = Math.floor(Math.random() * 200) - 100;
    
    // Update the state with the new coordinates
    setPosition({ x: randomX, y: randomY });
  }

  return (
    // We put it in a fixed-height container so the page doesn't stretch and shrink when it moves
    <div style={{ height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <button 
        onMouseEnter={handleHover}
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`, 
          transition: 'transform 0.1s ease-out' // Smooth, fast movement
        }}
      >
        Catch me if you can!
      </button>
    </div>
  );
}

// note: required npm install react-router-dom
function NextPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>We navigated to a new page!</h1>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}
  
function Home() {
  const navigate = useNavigate();

  // Proper react state management with useState hook
  const [customFlag, setCustomFlag] = useState(true);
  let flagDescription;
  if (customFlag) {
    flagDescription = <p>Custom flag is on</p>;
  } else {
    flagDescription = <p>Custom flag is off</p>;
  }

  const [sharedCount, setSharedCount] = useState(0);

  return (
    <div>
      <h1>Hello there, {user.name}</h1>
      <MyButton />
      <div>{flagDescription}</div>

      <hr /><AlertButtonContainer /><hr />

      <hr />
      <ToggleButtonContainer 
        description={"2. Toggle Variables:"} 
        customFlag={customFlag}           // Pass the current state
        setCustomFlag={setCustomFlag}     // Pass the function to change the state
      />
      <hr />

      <hr /><div>
        <p>3. Timing Issues:</p>
        <CounterButton sleepy={true}/>
      </div><hr />

      <hr /><div>
        <p>4. Variable Scoping:</p>
        <div>
          <p>Counter buttons with independent state:</p>
          <CounterButton />
          <CounterButton />
        </div>
        <div>
          <p>Counter buttons sharing state:</p>
          <SharedCounterButton sharedCount={sharedCount} setSharedCount={setSharedCount} />
          <SharedCounterButton sharedCount={sharedCount} setSharedCount={setSharedCount} />
        </div>
      </div><hr />

      <hr /><div>
        <p>5. Changing attributes dynamically:</p>
        <ColorChanger />
      </div><hr />

      <hr /><div>
        <p>6. Reactive elements on hover:</p>
        <FleeingButton />
      </div><hr />

      <hr /><div>
        <p>7. Navigating between pages:</p>
        <button onClick={() => navigate('/next')}>Go to Next Page</button>
      </div>
      

    </div>
  );
}

function MyApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/next" element={<NextPage />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default MyApp;