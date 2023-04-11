# Installation Guide

1. Clone or download the source code.
2. Run the command `npm i` on the terminal to install the relevant packages (you must install Node.js first).
3. Create a file called **salt.ts** in the path **src** to add salt to the password hash. The file format should follow this template:
	```
	export const salt = {
      value: 'YOUR_SECRET_VALUE',
	};
	```
	The value in the salt object must be your own secret value and kept confidential.
4. Run the command `npm start` to start the React app in development mode.
Open [http://localhost:3000](http://localhost:3000) in your browser to see the results.
