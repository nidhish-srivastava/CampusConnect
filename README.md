
## CampusConnect - A College Social Networking Platform

CampusConnect is a social networking platform designed specifically for college students. It aims to connect students within the same campus and all the profiles and bios like github,linkedin,leetcode are present.

So it gets very easy for college students to know each other's professional socials and explore other college students as well and get in contact

<!--
![CampusConnect Logo](https://yourwebsite.com/path-to-logo.png)
## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features
CampusConnect offers a range of features to enhance the college experience:
>

- **User Authentication:** Users can sign up, log in, and manage their profiles securely.
- **Campus-wide Posts:** Share text and multimedia posts with the entire campus community.
- **Friend Requests:** Send and accept friend requests to connect with fellow students.
- **Direct Messaging:** Private chat with friends and classmates.
- **Groups:** Create and join interest-based groups and clubs.
- **Events:** Organize and discover events happening on campus.
- **Notifications:** Stay updated with real-time notifications.
- **User Profiles:** Customize profiles with pictures, information, and more.
- **Search:** Easily find friends, groups, and posts on the platform.

## Getting Started

Follow these steps to set up CampusConnect on your local machine.

### Prerequisites

Before you begin, ensure you have the following software installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Installation

1. Clone the CampusConnect repository:

   ```bash
   git clone https://github.com/yourusername/CampusConnect.git
   ```

2. Navigate to the project directory:

   ```bash
   cd CampusConnect
   ```

3. Install frontend dependencies:

   ```bash
   cd client
   npm install
   ```

4. Install backend dependencies:

   ```bash
   cd ../server
   npm install
   ```

5. Create a `.env` file in the `server` directory and add the following environment variables:

   ```
   PORT=3001
   MONGODB_URI=your-mongodb-uri
   SECRET_KEY=your-secret-key
   ```

6. Start the server:

   ```bash
   npm start
   ```

7. Start the frontend development server:

   ```bash
   cd ../client
   npm run dev
   ```

8. Visit `http://localhost:3000` in your web browser to access CampusConnect.

## Usage

1. Sign up for a new account or log in with an existing one.
2. Explore the platform, connect with friends, join groups, and share your thoughts and experiences with the campus community.
3. Enjoy the CampusConnect experience!

## Contributing

Contributions are welcome! If you'd like to contribute to CampusConnect, please follow these guidelines:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your branch to your fork.
5. Submit a pull request to the `main` branch of the original repository.

## License

This project is licensed under the [MIT License](LICENSE).

---

Happy connecting on CampusConnect! If you have any questions or encounter issues, feel free to reach out to us at [your@email.com](mailto:your@email.com).
-->
## Technologies Used

  - [Next.js](https://nextjs.org/) , [ExpressJs](https://expressjs.com/) - Framework
  - [Tailwind CSS](https://tailwindcss.com/) , [shadcn/ui](https://ui.shadcn.com/) - Styling
  - [Typescipt](https://www.typescriptlang.org/) , [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Language
    <!--  - [react-hook-form](https://www.react-hook-form.com/) -->
  - [MongoDB](https://www.mongodb.com/) - Database
  - [Cloudinary](https://cloudinary.com/) - ImageStorage
  - [Vercel](https://vercel.com/) - Deployment

## Demo
https://github.com/nidhish-srivastava/Campus-Connect/assets/108972571/3abca198-8f08-4bfe-a3cf-4337e9ef003e

## Features
* Login, SignUp and Logout using JWT token,localStorage and authentication middleware using Bearer header

* Profile Picture upload using Cloudinary and react-image-file-resizer libr.

* Follow and Unfollow a student or remove him from your followers list

* Search a person based on his username

* Colleges are also saved based on student's profile registration

* Explore students by searching them through their college

* MultiStep Profile Creation with react hook form libr. for managing it



