import React, { useState } from 'react';

import Signup from '../components/Signup';

const LandingPages = () => {

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
        </div>

        <div className="col-12 col-md-10 my-3">
         
            <Signup
              title="Here's the current roster of friends..."
            />
        
        </div>
      </div>
    </main>
  );
};


export default LandingPages;