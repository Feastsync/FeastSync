import React from 'react'
import { dashboardVerification } from '../../mock/moc'

const AdminVerify = () => {
  return (
    <div>
     <div>
        <p>KYC Verification</p>
        <p>Trust & safety.Identity Verification Queue</p>
     </div>

     <div>
        {
          dashboardVerification.map((index, verify)=>(
            <div key={index}>
          <section>
            <img src={verify.verifyImage} alt="" />
            <p>{verify.verifyText}</p>
          </section>
          <p>{verify.verifyNumber}</p>
        </div>
          ))
        }
     </div>
    </div>
  )
}

export default AdminVerify
