import { redirect } from "next/navigation";


//############################################################################################
// TODOS                                                                                     #
// * after clicking button New Transaction user have to choose whether it will be            #
//   "standard" transaction or "exchange" one (later maybe there will be also support        #
//   for transfer between various accounts which belong to the user)                         #
// * above the main table with transactions there should be some button to open              #
//   some dialog with totals of transactions retrieved after applying filters                #
// * after adding historical exchange rates to each transaction on server side               #
//   there will be also some dialog with totals only in main currency                        #
// * add some way to save on disc the copy of all transactions as a CSV file to have         #
//   some way of creating a back-up of user's data                                           #
// * before applying some major changes start writing unit tests for existing components     #
//############################################################################################


export default function Home() {
  redirect("/transactions")
}