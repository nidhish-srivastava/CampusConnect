// Modal.js
import { Cross, X } from 'lucide-react';
import React from 'react';

type props = {
    isOpen : boolean
    onClose : ()=>void
    children : React.ReactNode
}

const Modal = ({ isOpen, onClose, children } : props) => {
  const modalClasses = isOpen ? ' mx-auto flex items-center justify-center' : 'hidden';
  return (
    <div className={modalClasses} >
      <div className=" fixed inset-0 bg-black opacity-50"></div>
      <div className="absolute  bg-white p-8 rounded shadow-lg top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full overflow-y-auto h-3/5 mt-[10rem] max-w-md">
        <span
        className='absolute top-0 right-0 cursor-pointer'   
        onClick={onClose}
        >
        <X/>
        </span>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
