import { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
const Resources = () => {
  useEffect(() => {
    document.title = 'Resources - IB Vault';
  }, [])
    
  return (
    <div className="flex flex-col w-full h-full items-center">
  <NavBar />
  <div className="flex flex-col relative p-10 w-full max-w-4xl justify-center items-center">  {/* Set max-width to center the content */}
    <h1 className="text-4xl mb-8 font-semibold text-center">Free Online Resources</h1>

    <section className="flex flex-col mb-10 w-full items-center text-center">
      <h2 className="text-2xl mb-4">Technical Preparation</h2>
      <ul className="list-none ml-5">
        <li>
          <a href="https://www.wallstreetoasis.com/guide/investment-banking-dcf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Discounted Cash Flow (DCF) Guide - Wall Street Oasis
          </a>
        </li>
        <li>
          <a href="https://www.investopedia.com/articles/financial-theory/11/how-to-value-a-company.asp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            How to Value a Company - Investopedia
          </a>
        </li>
        <li>
          <a href="https://corporatefinanceinstitute.com/resources/financial-modeling/three-financial-statements/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Understanding the Three Financial Statements - CFI
          </a>
        </li>
        <li>
          <a href="https://mergerandacquisitionmodels.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Merger Model Walkthrough - M&A Models
          </a>
        </li>
      </ul>
    </section>

    <section className="flex flex-col mb-10 w-full items-center text-center">
      <h2 className="text-2xl mb-4">Behavioral Preparation</h2>
      <ul className="list-none ml-5">
        <li>
          <a href="https://www.wallstreetoasis.com/resources/interviews/behavioral-interview-guide" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Behavioral Interview Guide - Wall Street Oasis
          </a>
        </li>
        <li>
          <a href="https://www.themuse.com/advice/common-behavioral-interview-questions" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Common Behavioral Interview Questions - The Muse
          </a>
        </li>
      </ul>
    </section>

    <section className="flex flex-col mb-10 w-full items-center text-center">
      <h2 className="text-2xl mb-4">Additional Resources</h2>
      <ul className="list-none ml-5">
        <li>
          <a href="https://www.amazon.com/Investment-Banking-Valuation-Leveraged-Acquisitions/dp/1119868400/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Investment Banking Book - Rosenbaum & Pearl
          </a>
        </li>
        <li>
          <a href="https://www.preplounge.com/en/industry-specific-preparation/investment-banking" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            PrepLounge: Investment Banking Interview Prep
          </a>
        </li>
      </ul>
    </section>
  </div>
  <Footer/>
</div>

  )
}

export default Resources;