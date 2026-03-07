import React from 'react'
import { doSignOut } from '../../../utils/authUtils'

const LogoutBtn: React.FC = () => (
  <button
    className="btn"
    onClick={async () => await doSignOut()}
    aria-label="Esci dal profilo"
  >
    <i className="bi bi-box-arrow-right"></i>
  </button>
)

export default LogoutBtn
