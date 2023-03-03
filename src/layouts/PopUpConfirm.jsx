import React from 'react'
import Button from '../components/ui/Button'

const PopUpConfirm = ({ showPopUpConfirm, setShowPopUpConfirm }) => {
    const closePopUp = (e) => {
        e.preventDefault()
        setShowPopUpConfirm(0)
    }
    
    return (
        <div className='bg-white rounded-lg px-8 py-6 w-1/2'>
            <h3 className='text-1xl font-bold mb-3'>Connect has been sent </h3>
            <p>As soon as the other part accept the connect you will have the access to the contact information.</p>
            <div className='flex items-center justify-end mt-4'>
                <Button title={'Cancel'} color='text-secondary-600' bgcolor={'bg-white'} onclick={closePopUp} />
                <div className='mr-4'></div>
                <Button title={'Confirm'} color='text-white' bgcolor={'bg-primary-500'}/>
            </div>
        </div>
    )
}

export default PopUpConfirm