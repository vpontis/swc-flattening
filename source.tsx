import React from 'react';

const Button = () => (
  <button>
    Click me
    <style jsx>{`
      .container {
        text: red;
        .inner-class {
          text: yellow;
        }
        div {
          text: blue;
        }
      }
    `}</style>
  </button>
);

export default Button;
