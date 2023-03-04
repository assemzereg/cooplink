import React, { useEffect, useState } from 'react'
import CardBussiness from './CardBussiness'
import bussiness from '../../data/businesses.json'
import { useNavigate } from 'react-router-dom'

const CardBussinessList = ({ select, setSelect }) => {
  const [dataBussiness, setDataBussiness] = useState(bussiness)
  const dataRes = JSON.parse(localStorage.getItem('data'))
  useEffect(() => {
    if (dataRes.length == 0) {
      navigate('/alert')
    }
  }, [])

  const [ser, setSer] = useState('')

  const navigate = useNavigate()

  return (
    <div className="mt-4 ml-14 relative">
      <div
        className={`h-[calc(100%-140px)] border-l-2 bg-gray-200 absolute -left-10 top-4 z-30`}
      ></div>
      <div>
        {dataRes.map((elt) => {
          const res = bussiness.filter(
            (b) => b.business_id === elt[0].business_id,
          )
          console.log('res', res)
          return (
            <div onClick={() => setSelect(res[0].business_id)}>
              <CardBussiness
                key={res[0].business_id}
                img=""
                title={res[0].business_name}
                desp="In KPCapital we can collect many data, that would help your business to find the right capital providers."
                industry={res[0].industry_name}
                collaborations={res[0].collaboration}
                borderColor={
                  select === res[0].business_id
                    ? 'border-primary-500 border-2'
                    : 'broder-2'
                }
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CardBussinessList
