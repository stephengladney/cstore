import type { ReactComponents } from "../../types/React"

export function CartContainer({ children }: ReactComponents) {
  return (
    <div className="flex hidden h-full w-[360px] flex-col border border-solid border-gray-300 px-1 pt-6 md:block">
      {children}
    </div>
  )
}

// import styled from "styled-components"
// import { getColor, GreenButton } from "../../lib/styles"

// export const CartContainer = styled.div`
//   background: ${(p) => getColor("white")};
//   border: 1px solid ${(p) => getColor("grayLight")};
//   box-shadow: 0px 0px 6px ${getColor("grayLight")};
//   color: ${(p) => getColor("black")};
//   display: flex;
//   flex-direction: column;
//   margin-top: 58px;
//   padding: 25px 5px 10px 5px;
//   position: fixed;
//   right: 0;
//   transition: background 1.2s;
//   height: calc(100vh - 90px);
//   width: 350px;

//   @media (max-width: 768px) {
//     display: none;
//   }
// `

// export const CartHeader = styled.header`
//   border-bottom: 1px solid ${getColor("grayLight")};
//   color: ${(p) => getColor("black")};
//   font-family: Poppins-Bold;
//   font-size: 21px;
//   padding: 15px 10px;
// `

// export const MobileViewCartButton = styled.button`
//   @media (min-width: 768px) {
//     display: none !important;
//   }

//   animation: fadeIn ease 0.5s;

//   @keyframes fadeIn {
//     0% {
//       opacity: 0;
//     }
//     100% {
//       opacity: 1;
//     }
//   }

//   /* background: #21a945 !important; */
//   background: #2a6f8a !important;
//   bottom: 25px;
//   box-shadow: 2px 2px 4px ${getColor("grayLight")} !important;
//   font-family: Poppins-Bold;
//   left: 50% !important;
//   margin-left: -150px !important;
//   color: #eee;
//   font-size: 16px !important;
//   padding: 20px !important;
//   position: fixed;
//   width: 300px;
//   z-index: 2;
// `

// export const EmptyStateWrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `

// export const EmptyStateMessage = styled.div`
//   margin-top: -90px;
//   color: ${(p) => getColor("gray")};
// `

// export const CartItemsContainer = styled.div`
//   flex-grow: 1;
//   overflow-y: auto;
//   &:-webkit-scrollbar-thumb {
//     color: #f00;
//   }
// `

// export const CheckoutContainer = styled.div`
//   border-top: 1px solid ${getColor("grayLight")};
//   height: 150px;
//   padding: 25px;
// `

// export const CheckoutButton = styled(GreenButton)`
//   /* background: #2a6f8a !important; */
//   /* bottom: 75px; */
//   /* box-shadow: 2px 2px 4px ${getColor("grayLight")} !important; */
//   /* color: ${getColor("white")} !important; */
//   /* display: block !important; */
//   /* font-size: 18px !important;
//   font-weight: 700; */
//   margin: 0 auto !important;
//   margin-top: 16px !important;
//   padding: 18px !important;
//   width: 300px;
// `
