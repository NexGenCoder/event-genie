import { Modal } from 'antd'
import React from 'react'

import LoginForm from './login-form'

interface LoginModalProps {
   isModalOpen: boolean
   handleCancel: () => void
}

const LoginModal = ({ isModalOpen, handleCancel }: LoginModalProps) => {
   return (
      <Modal
         title="Sign In/Sign Up"
         open={isModalOpen}
         onCancel={handleCancel}
         cancelButtonProps={{ style: { display: 'none' } }}
         okButtonProps={{ style: { display: 'none' } }}
      >
         <LoginForm />
      </Modal>
   )
}

export default LoginModal
