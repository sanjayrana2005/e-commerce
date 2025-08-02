import React from 'react'
import { IoClose, IoCloseCircle } from "react-icons/io5";

const AddFieldComponent = ({ close,value,onChange,submit }) => {
    return (
        <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-60 z-50 flex items-center justify-center p-4'>
            <div className='bg-white rounded p-4 w-full max-w-md'>
                <div className='flex justify-between'>
                    <h1 className='font-medium'>Add
                        Fields</h1>
                    <button onClick={close}>
                        <IoClose size={25} />
                    </button>
                </div>
                <input
                    type="text"
                    className='bg-blue-50 p-2 border outline-none border-primary-200 rounded w-full my-3'
                    placeholder='Enter field name'
                    value={value}
                    onChange={onChange}
                />
                <button className='bg bg-primary-100 px-4 py-2 rounded mx-auto block hover:bg-primary-200'
                onClick={submit}>Add Field</button>
            </div>

        </section>
    )
}

export default AddFieldComponent
