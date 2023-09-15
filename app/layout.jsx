import '@styles/global.css' 
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import Image from 'next/image'

export const metatdata = {
    title :"Philo",
    description:"share and love philosophy"
}

function RootLayout({ children }) {
  return (
   <html lang='en'>
    <body style={{backgroundColor:'black'}}>
        <Provider>
        <div>
        <div className='gradient'/>    

        <main className='app'>
            <Nav />
            <div className='background_img'>
            <Image src='/assets/images/metalskullbg.png'
            width={2000}
            height={100}
            alt='bg'
            />
            </div>
            {children}
        </main>
        </div>
        </Provider>
    </body>
   </html>
  )
}

export default RootLayout