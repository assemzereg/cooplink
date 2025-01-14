import React, { useEffect, useState } from 'react'
import Logo from '../../assets/logo/logo2.svg'
import SelectBox from './SelectBox'
import Button from './Button'
import data from '../../data/quest.json'
import commandeService from '../../services/commande'
import { Link, useNavigate } from 'react-router-dom'

const CardQuestion = () => {
  const navigate = useNavigate()

  const [qte, setQte] = useState(data)

  const [listProd, setListProd] = useState([])

  const [page, setPage] = useState(1)
  const [industry, setIndustry] = useState('')
  const [prod, setProd] = useState()
  const [budget, setBudget] = useState(0)
  const [mass, setMass] = useState(0)
  const [seviceList, setServiceList] = useState([])

  const changeSelectIndustry = (e) => {
    setIndustry(e.target.value)
  }
  const changeSelectProd = (e) => {
    setProd(e.target.value)
  }
  const changeSelectBudget = (e) => {
    setBudget(e.target.value)
  }
  const changeSelectMass = (e) => {
    setMass(e.target.value)
  }

  const nextPage = (e) => {
    e.preventDefault()
    if (industry !== '') {
      setPage((prev) => prev + 1)
      console.log(qte[industry][1])
    }
  }

  const addProd = (e) => {
    e.preventDefault()
    setPage(1)

    let pid = 13
    if (prod === 'Wood') pid = 2
    else if (prod === 'Plastic') pid = 3
    else if (prod === 'Iron') pid = 1

    setListProd((prev) => [...prev, pid])

    setProd('')
    setIndustry('')
  }

  const sendCommande = (e) => {
    e.preventDefault()

    let pid = 13
    if (prod === 'Wood') pid = 2
    else if (prod === 'Plastic') pid = 3
    else if (prod === 'Iron') pid = 1

    console.log(pid)
    // setListProd(listProd.push(pid))

    const commandeObject = {
      prod: [...listProd, pid],
      budget: parseInt(budget),
      mass: parseInt(mass),
    }

    setListProd((prev) => [...prev, pid])
    console.log('res', commandeObject)

    // setPage(0)
    // setProd('')
    // setBudget(0)
    // setIndustry('')
    // setMass(0)

    commandeService
      .create(commandeObject)
      .then((resp) => {
        console.log('success')
        console.log(resp.data)
        localStorage.setItem('data', JSON.stringify(resp.data))
        navigate('/loading')
      })
      .catch((err) => {
        console.error('error', err)
      })
  }

  return (
    <div className="bg-white h-full p-4 rounded-xl shadow-md w-full">
      <div className="px-4 flex flex-col justify-between items-center bg-1 bg-contain py-4 h-full w-full">
        <img src={Logo} alt="" className="w-36" />
        <form className="w-full" onSubmit={sendCommande}>
          {page === 1 && (
            <div>
              <div className="mb-4">
                <p className="text-2xl font-semibold w-5/6 inline">
                  {qte['general'][0].question}
                </p>
                <SelectBox
                  options={qte['general'][0].options}
                  onchange={changeSelectIndustry}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  title={'Next'}
                  color="text-white"
                  bgcolor="bg-primary-500"
                  onclick={nextPage}
                  disactive={industry === ''}
                />
              </div>
            </div>
          )}
          {page === 2 && (
            <div>
              <div className="mb-4">
                <p className="text-2xl font-semibold w-5/6 inline">
                  {qte[industry][0].intro}
                </p>
                <SelectBox
                  options={qte[industry][1].options}
                  onchange={changeSelectProd}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  title={'Add Other Industry'}
                  color="text-white"
                  bgcolor="bg-orange-500"
                  onclick={addProd}
                />
                <div className="mr-4"></div>
                <Button
                  title={'Next'}
                  color="text-white"
                  bgcolor="bg-primary-500"
                  onclick={nextPage}
                  disactive={prod === ''}
                />
              </div>
            </div>
          )}
          {page === 3 && (
            <div className="">
              <div className="mb-4">
                <p className="text-2xl font-semibold w-5/6 inline">
                  {qte[industry][2].question}
                </p>
                <SelectBox
                  options={qte[industry][2].options}
                  onchange={changeSelectBudget}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  title={'Next'}
                  color="text-white"
                  bgcolor="bg-primary-500"
                  onclick={nextPage}
                  disactive={budget === ''}
                />
              </div>
            </div>
          )}
          {page === 4 && (
            <div>
              <div className="mb-4">
                <p className="text-2xl font-semibold w-5/6 inline">
                  {qte[industry][3].question}
                </p>
                <SelectBox
                  options={qte[industry][3].options}
                  onchange={changeSelectMass}
                />
              </div>
              <div className="flex justify-end">
                <input
                  type="submit"
                  value="Send"
                  className="px-4 py-2 font-semibold text-sm rounded-lg bg-primary-500 text-white cursor-pointer"
                />
              </div>
            </div>
          )}
        </form>
        <Link to={'/dashboard'}>
          <p className="text-primary-700 font-semibold text-sm hover:underline cursor-pointer">
            Skip To The Empty Dashboard
          </p>
        </Link>
      </div>
    </div>
  )
}

export default CardQuestion
