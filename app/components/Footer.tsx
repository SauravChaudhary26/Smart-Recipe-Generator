"use client";

import { Github, Linkedin, Mail, Phone, MapPin, GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left Column: Personal & Academic Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Saurav Kumar Chaudhary</h2>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Reg. No.: 20224135</p>
            </div>
            
            <div className="space-y-1 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <GraduationCap size={18} className="text-blue-600 dark:text-blue-400" />
                <span>Bachelor of Technology</span>
              </div>
              <p className="pl-6.5 text-sm">Electronics and Communication Engineering</p>
            </div>

            <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
              <MapPin size={18} className="text-blue-600 dark:text-blue-400 mt-1 shrink-0" />
              <div>
                <p>Motilal Nehru National Institute of Technology</p>
                <p className="text-sm">Allahabad, Prayagraj</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Socials */}
          <div className="flex flex-col md:items-end space-y-4">
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <a href="tel:+918709073069" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors md:justify-end">
                <Phone size={18} />
                <span>+91-8709073069</span>
              </a>
              <a href="mailto:sauravchaudhary2609@gmail.com" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors md:justify-end">
                <Mail size={18} />
                <span>sauravchaudhary2609@gmail.com</span>
              </a>
              <a href="mailto:saurav.20224135@mnnit.ac.in" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors md:justify-end">
                <Mail size={18} />
                <span>saurav.20224135@mnnit.ac.in</span>
              </a>
            </div>

            <div className="flex gap-4 pt-2">
              <a 
                href="https://github.com/SauravChaudhary26" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white transition-all"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/sauravchaudhary26" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} Smart Recipe Generator. All rights reserved.
        </div>
      </div>
    </footer>
  );
}