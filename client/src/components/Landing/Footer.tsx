import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";

function Footer(){
    return(
      <footer className="bg-gray-900 text-white py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p>&copy; 2024 CampusConnect | Developed by Nidhish </p>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/nidhish-srivastava/" target="_blank" rel="noopener noreferrer" className=" mx-2">
              <LinkedinIcon/>
            </a>
            <a href="https://twitter.com/Nidhish_30" target="_blank" rel="noopener noreferrer" className="mx-2">
              <span>
                <TwitterIcon/>
              </span>
            </a>
            <a href="https://github.com/nidhish-srivastava" target="_blank" rel="noopener noreferrer">
              <span>
                <GithubIcon/>
              </span>
            </a>
          </div>
        </div>
      </footer>
    )
  }
  
export default Footer
