import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MainHead from "@/components/MainHead";
import MainAside from "@/components/MainAside";
import LogIn from "@/components/LogIn";
import Link from "next/link";
import { Scanner } from "@yudiel/react-qr-scanner";

const inter = Inter({ subsets: ["latin"] });
let result
export default function SubirGrupo(){

    const mius = ()=>{
      let audio = new Audio("/src/huh.ogg")
      console.log(audio)
      audio.play
    }

    return(
    <>
        <MainHead title='SARA'/>
        <div className={styles.container}>
        <MainAside/>
        <div className={styles.MainArea}>
        <font>
          <center><div style={{'border':'1px solid black', 'width':'300px', 'height':'300px'}}>
          <Scanner components={{audio: false}} allowMultiple={true} onScan={(result) => {
            let ChangeeverythingyouareAndeverythingyouwereYournumberhasbeencalledFightsandbattleshavebegunRevengewillsurelycomeYourhardtimesareaheadBestyouvegottobethebestYouvegottochangetheworldAndusethischancetobeheardYourtimeisnowyourtimeisnowChangeeverythingyouareAndeverythingyouwereYournumberhasbeencalledFightsandbattleshavebegunRevengewillsurelycomeYourhardtimesareaheadBestyouvegottobethebestYouvegottochangetheworldAndusethischancetobeheardYourtimeisnowyourtimeisnowDontletyourselfdownDontletyourselfgoYourlastchancehasarrivedBestyouvegottobethebestYouvegottochangetheworldAndusethischancetobeheardYourtimeisnowyourtimeisnow = result[0].rawValue
            console.log(ChangeeverythingyouareAndeverythingyouwereYournumberhasbeencalledFightsandbattleshavebegunRevengewillsurelycomeYourhardtimesareaheadBestyouvegottobethebestYouvegottochangetheworldAndusethischancetobeheardYourtimeisnowyourtimeisnowChangeeverythingyouareAndeverythingyouwereYournumberhasbeencalledFightsandbattleshavebegunRevengewillsurelycomeYourhardtimesareaheadBestyouvegottobethebestYouvegottochangetheworldAndusethischancetobeheardYourtimeisnowyourtimeisnowDontletyourselfdownDontletyourselfgoYourlastchancehasarrivedBestyouvegottobethebestYouvegottochangetheworldAndusethischancetobeheardYourtimeisnowyourtimeisnow)
            mius()
          }} />
          </div></center>
          <Link href={'Escaner/escaner'}>{result}</Link>
        </font>
        </div>
        </div>
    </>
  )
}
