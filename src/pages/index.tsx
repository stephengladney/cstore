import { type NextPage } from "next"
import Link from "next/link"
import Head from "next/head"
import Image from "next/image"
import { FaInstagram, FaTwitter, FaFacebook, FaTiktok } from "react-icons/fa"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          Commission-free ordering and delivery for convenience stores - GoSnack
        </title>
      </Head>
      <div className="flex h-screen w-screen flex-col items-center justify-start bg-red-600 font-bold">
        <div className="sticky top-0 flex w-screen flex-row items-center bg-slate-100  p-6 lg:pr-10">
          <h3 className="font-poppins text-2xl font-bold text-red-600">
            GoSnack
          </h3>
          <div className="text-md flex grow flex-row justify-end gap-x-8 font-poppins font-normal text-red-600 lg:gap-x-12">
            <Link href="/" className="hover:underline">
              Login
            </Link>
            <Link href="/" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="grid w-screen grid-cols-[1fr,0.93fr] items-center">
          <div>
            <div className="px-12 text-center">
              <h1 className="px-4 font-poppins text-4xl text-white lg:text-5xl lg:leading-normal">
                Commission-free ordering and delivery for independent retailers.
              </h1>
              <h2 className="mt-12 font-poppins text-3xl font-normal text-white">
                $99/month. No other fees. Period.
              </h2>
              <div>
                <button className="mt-12 rounded-full border-2 border-solid border-white bg-white py-3 px-12 font-poppins font-normal uppercase text-black hover:border-slate-600 hover:bg-slate-600 hover:text-white">
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
          />
        </div>
        <div className="grid w-screen grid-cols-[1fr,1fr] items-center gap-14 bg-slate-800 px-4 text-white md:p-12 lg:px-[100px] lg:pt-[100px] lg:pb-[75px] 2xl:gap-0">
          <div>
            <Image
              src="/stock_cashier.jpg"
              width={650}
              height={432}
              alt="Cashier photo"
              className="rounded-3xl"
            />
          </div>
          <div>
            <h2 className="mb-8 font-poppins text-4xl font-light">
              We like to keep it simple.
            </h2>
            <p className="font-poppins text-lg font-normal">
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
        <div className="grid w-screen grid-cols-[1fr,1fr] items-center gap-14 bg-red-600 px-4 text-white md:p-12 lg:px-[100px] lg:pt-[100px] lg:pb-[75px] 2xl:gap-8">
          <div>
            <h2 className="mb-8 font-poppins text-4xl font-light">
              Let us take care of the tech.
            </h2>
            <p className="w-[650px] font-poppins text-lg font-normal">
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
            <Image
              src="/stock_womanonphone.jpeg"
              width={650}
              height={432}
              alt="Cashier photo"
              className="rounded-3xl"
            />
          </div>
        </div>
        <h3 className="w-full bg-slate-100 pt-[100px] pb-[50px] text-center font-poppins text-4xl font-bold text-slate-600">
          What our customers say
        </h3>
        <div className="flex w-screen flex-row items-center justify-around gap-12 bg-slate-100 px-12 pb-[100px] text-slate-900">
          <div className="py-12">
            <h2 className="w-96 font-poppins text-xl font-light ">
              {'"We\'ve done over $1,000 in revenue last month."'}
            </h2>
            <h3 className="mt-4 text-right font-poppins text-sm font-bold text-red-600">
              Rakesh Patel
            </h3>
            <h3 className="text-right font-poppins text-sm font-bold font-normal text-slate-600">
              Owner, Kirkwood Neighborhood Market
            </h3>
          </div>
          <div>
            <h2 className="w-96 font-poppins text-xl font-light ">
              {'"We\'ve done over $1,000 in revenue last month."'}
            </h2>
            <h3 className="mt-4 text-right font-poppins text-sm font-bold text-red-600">
              Rakesh Patel
            </h3>
            <h3 className="text-right font-poppins text-sm font-bold font-normal text-slate-600">
              Owner, Kirkwood Neighborhood Market
            </h3>
          </div>
          <div>
            <h2 className="w-96 font-poppins text-xl font-light ">
              {'"We\'ve done over $1,000 in revenue last month."'}
            </h2>
            <h3 className="mt-4 text-right font-poppins text-sm font-bold text-red-600">
              Rakesh Patel
            </h3>
            <h3 className="text-right font-poppins text-sm font-bold font-normal text-slate-600">
              Owner, Kirkwood Neighborhood Market
            </h3>
          </div>
        </div>
        <div className="flex w-screen flex-row items-center bg-slate-800  p-6 lg:pr-10">
          <h3 className="font-poppins text-xl font-bold text-white">GoSnack</h3>
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
