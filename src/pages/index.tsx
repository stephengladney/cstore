import { type NextPage } from "next"
import Link from "next/link"
import Head from "next/head"
import Image from "next/image"
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaTiktok,
  FaFirstOrder,
} from "react-icons/fa"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          fared | Commission-free ordering and delivery for convenience stores
        </title>
      </Head>
      <div className="flex h-screen w-screen flex-col items-center justify-start  bg-slate-100 font-bold">
        <div className="sticky top-0 flex w-screen flex-row items-center border-b-[1px]  border-solid border-b-slate-500 bg-slate-100 p-6 lg:pr-10">
          <h3 className="flex flex-row items-center font-poppins text-2xl font-bold text-red-600">
            <FaFirstOrder className="mr-2" />
            fared
          </h3>
          <div className="text-md flex grow flex-row justify-end gap-x-8 font-poppins font-bold text-slate-600 lg:gap-x-12">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/" className="hover:underline">
              About
            </Link>

            <Link href="/" className="hover:underline">
              Contact Us
            </Link>
            <Link href="/" className="hover:underline">
              Login
            </Link>
          </div>
        </div>
        <div className="w-screen items-center lg:grid lg:grid-cols-[1fr,0.93fr]">
          <div>
            <div className="px-12 py-12 text-center">
              <h1 className="font-poppins text-4xl text-red-600 lg:px-4 lg:py-0 lg:text-5xl lg:leading-normal">
                Commission-free online ordering and delivery for independent
                retailers.
              </h1>
              <h2 className="mt-12 font-poppins text-3xl font-normal text-slate-700">
                $99/month. No other fees. Period.
              </h2>
              <div>
                <button className="mt-12 rounded-full border-2 border-solid border-red-600 bg-red-600 py-3 px-12 font-poppins font-normal uppercase text-white hover:border-slate-800 hover:bg-slate-800 hover:text-white">
                  Sign me up
                </button>
              </div>
            </div>
          </div>
          <Image
            src="/stock_storeowner.jpg"
            height={1000}
            width={1000}
            alt="store owner"
            className="hidden lg:block"
          />
        </div>
        <div className="flex w-screen flex-col items-center gap-14 bg-slate-800 pb-12 text-white md:p-12 lg:grid lg:grid-cols-[1fr,1fr] lg:py-16 lg:px-[100px] 2xl:gap-8">
          <div>
            <img
              alt="Convenience store cashier"
              src="/stock_cashier.jpg"
              // width={400}
              height={432}
              className="w-full lg:w-auto lg:max-w-[612px] lg:rounded-xl"
            />
          </div>
          <div>
            <h2 className="mb-8 px-8 text-center font-poppins text-4xl font-light lg:text-left">
              Straight-forward pricing
            </h2>
            <p className="px-8 text-center font-poppins text-lg font-normal lg:text-left xl:w-[650px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="flex w-screen flex-col-reverse items-center gap-14 bg-red-600 pb-12 text-white md:p-12 lg:grid lg:grid-cols-[1fr,1fr] lg:py-16 lg:px-[100px] lg:pt-12 2xl:gap-8">
          <div>
            <h2 className="mb-8 px-8 text-center font-poppins text-4xl font-light lg:text-left">
              We take care of the tech
            </h2>
            <p className="px-8 text-center font-poppins text-lg font-normal lg:text-left xl:w-[650px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div>
            <img
              alt="Woman on smartphone"
              src="/stock_womanonphone.jpeg"
              width={650}
              height={432}
              className="w-full lg:w-auto lg:rounded-xl"
            />
          </div>
        </div>
        <div className="w-full bg-slate-100 py-20 lg:py-24">
          <h3 className="w-full pb-[50px] text-center font-poppins text-4xl font-bold text-slate-600">
            What our<span className="hidden lg:inline"> </span>
            <br className="lg:hidden" />
            customers say
          </h3>
          <div className="flex w-full flex-col items-center justify-around gap-0 bg-slate-100 px-12 text-center text-slate-900 lg:flex-row lg:gap-12">
            <div className="py-12">
              <h2 className="font-poppins text-xl font-light ">
                {'"We\'ve done over $1,000 in revenue last month."'}
              </h2>
              <h3 className="mt-4 text-center font-poppins text-sm font-bold text-red-600 lg:text-right">
                Vik Patel
              </h3>
              <h3 className="text-center font-poppins text-sm font-bold font-normal text-slate-600 lg:text-right">
                Owner, Kirkwood Neighborhood Market
              </h3>
            </div>
            <div className="py-12">
              <h2 className="font-poppins text-xl font-light ">
                {'"We\'ve done over $1,000 in revenue last month."'}
              </h2>
              <h3 className="mt-4 text-center font-poppins text-sm font-bold text-red-600 lg:text-right">
                Vik Patel
              </h3>
              <h3 className="text-center font-poppins text-sm font-bold font-normal text-slate-600 lg:text-right">
                Owner, Kirkwood Neighborhood Market
              </h3>
            </div>
            <div className="py-12">
              <h2 className="font-poppins text-xl font-light ">
                {'"We\'ve done over $1,000 in revenue last month."'}
              </h2>
              <h3 className="mt-4 text-center font-poppins text-sm font-bold text-red-600 lg:text-right">
                Vik Patel
              </h3>
              <h3 className="text-center font-poppins text-sm font-bold font-normal text-slate-600 lg:text-right">
                Owner, Kirkwood Neighborhood Market
              </h3>
            </div>
          </div>
        </div>
        <div className="flex w-screen flex-row items-center bg-slate-800  p-6 lg:pr-10">
          <h3 className="font-poppins text-xl font-bold text-white">Fared</h3>
          <div className="text-md flex grow flex-row justify-end gap-x-8 text-white">
            <Link className="cursor-pointer hover:text-red-600" href="/">
              <FaInstagram size={18} />
            </Link>
            <Link className="cursor-pointer hover:text-red-600" href="/">
              <FaTiktok size={18} />
            </Link>
            <Link className="cursor-pointer hover:text-red-600" href="/">
              <FaTwitter size={18} />
            </Link>
            <Link className="cursor-pointer hover:text-red-600" href="/">
              <FaFacebook size={18} />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
