import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";



const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value})
  }

  const handSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // iuAwjuLP5Nb9nWqdh
    // template_nkxawrk
    // service_u8jngbn

    emailjs.send(
      'service_u8jngbn',
      'template_nkxawrk',
      {
        from_name: form.name,
        to_name: 'Chairat',
        from_email: form.email,
        to_email: '634230061@webmail.npru.ac.th',
        message: form.message,
      },
      'iuAwjuLP5Nb9nWqdh'
       )
       .then(() => {
        setLoading(false);
        alert('Thank you. I will get back to you as soon as possible.');

        setForm({
          name: '',
          email: '',
          message: '',
        })
       }, 
       (error) => {
        setLoading(false)

        console.error(error);

        alert('Something went wrong.')
       })
  }

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
      variants={slideIn('letf', "tween", 0.2, 1)}
      className="flex-[0.75] bg-black-100 p-8 rounded-2x1"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact</h3>

        <form 
        ref={formRef}
        onSubmit={handSubmit}
        className="mt-12 flex flex-col gap-8"
        >
          <label 
          className="flex flex-col">
            <samp className="text-white font-medium mb-4"
            > Your Name </samp>
            
          <input 
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="What's your name?"
          className="bg-tertiary py-4 px-6 placeholder:text-secondary
          text-white rounded-lg outlined-none border-none font-medium"
          />

          </label>
          <label 
          className="flex flex-col">
            <samp className="text-white font-medium mb-4"
            > Your Email </samp>
        
          <input 
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="What's your Email?"
          className="bg-tertiary py-4 px-6 placeholder:text-secondary
          text-white rounded-lg outlined-none border-none font-medium"
          />
          </label>

          <label 
          className="flex flex-col">
            <samp className="text-white font-medium mb-4"
            > Your Message </samp>
          <textarea
          rows="7"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="What do you want to say?"
          className="bg-tertiary py-4 px-6 placeholder:text-secondary
          text-white rounded-lg outlined-none border-none font-medium"
          />
          </label>

          <button
          type="submit"
          className="bg-tertiary py-3 px-8 outline-none w-fit 
          text-white font-bold shadow-md shadow-primary rounded-x1">

          {loading ? 'Sending...' : 'Send'}
          </button>

        </form>
      </motion.div>

      <motion.div
      variants={slideIn('right', "tween", 0.2, 1)}
      className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >

      <EarthCanvas/>
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact")