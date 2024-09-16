import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { CalendarIcon, ClockIcon, CodeIcon, LayoutIcon, MonitorIcon, Menu, X } from "lucide-react";

export default function WebinarSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: ''
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleGradeChange = (value) => {
    setFormData(prevData => ({
      ...prevData,
      grade: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    try {
      const response = await axios.post('/api/webinar-signup', formData); // POST to Laravel backend
      setSubmitStatus('success');
      setFormData({ name: '', email: '', grade: '' }); // Reset the form after success
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error during submission:', error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white shadow-sm relative z-10">
        <a className="flex items-center justify-center" href="#">
          <CodeIcon className="h-6 w-6 text-blue-500" />
          <span className="ml-2 font-bold text-lg">WebWizards</span>
        </a>
        <button className="ml-auto md:hidden" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
        <nav className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-full left-0 right-0 bg-white md:top-auto md:left-auto md:right-auto flex-col md:flex-row items-start md:items-center ml-auto md:gap-6 p-4 md:p-0 shadow-md md:shadow-none`}>
          <a className="text-sm font-medium hover:text-blue-500 transition-colors py-2 md:py-0" href="#">Home</a>
          <a className="text-sm font-medium hover:text-blue-500 transition-colors py-2 md:py-0" href="#">About</a>
          <a className="text-sm font-medium hover:text-blue-500 transition-colors py-2 md:py-0" href="#">Contact</a>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 mb-8 md:mb-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-600">
                    Learn HTML & CSS: Build Your First Website!
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Join our fun and interactive webinar to start your journey in web development. Perfect for beginners!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Oct 13, 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">4:00 PM - 5:30 PM CST</span>
                  </div>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <LayoutIcon className="w-5 h-5 text-green-500" />
                    <span>Learn the basics of HTML structure</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MonitorIcon className="w-5 h-5 text-purple-500" />
                    <span>Discover how to style with CSS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CodeIcon className="w-5 h-5 text-orange-500" />
                    <span>Build a simple webpage during the session</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center">
                <div className="w-full relative" style={{ paddingTop: '56.25%' }}>
                  <video
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    controls
                    poster="/placeholder.svg?height=400&width=600"
                  >
                    <source src="/path-to-your-video.mp4" type="video/mp4" />
                    <track kind="captions" src="/path-to-captions.vtt" label="English" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>

            {/* Sign-up form */}
            <div className="w-full max-w-2xl mx-auto">
              <div className="flex flex-col gap-4 p-6 md:p-8 bg-white rounded-3xl shadow-lg border border-gray-200">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-blue-600">Sign Up Now!</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ready to start your coding adventure? Fill out this form to join our webinar!
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Smith" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@example.com" 
                      type="email" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade Level</Label>
                    <Select value={formData.grade} onValueChange={handleGradeChange}>
                      <SelectTrigger id="grade">
                        <SelectValue placeholder="Select your grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6th Grade</SelectItem>
                        <SelectItem value="7">7th Grade</SelectItem>
                        <SelectItem value="8">8th Grade</SelectItem>
                        <SelectItem value="9">9th Grade</SelectItem>
                        <SelectItem value="10">10th Grade</SelectItem>
                        <SelectItem value="11">11th Grade</SelectItem>
                        <SelectItem value="12">12th Grade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white" 
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                  >
                    {submitStatus === 'submitting' ? 'Submitting...' : 'Join the Webinar'}
                  </Button>
                  {submitStatus === 'success' && (
                    <p className="text-green-600">Thank you for signing up!</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-red-600">An error occurred. Please try again.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 WebWizards. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">Terms of Service</a>
          <a className="text-xs hover:underline underline-offset-4" href="#">Privacy Policy</a>
        </nav>
      </footer>
    </div>
  );
}
