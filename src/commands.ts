import {Context} from 'grammy';
import {PaissaRespone} from "./paissaModel";
import axios, {AxiosResponse} from "axios";
import {PlotModel} from "./plotModel";

const LOTTERY_MASK = 0b001;
const INDIVIDUAL_MASK = 0b100;


export async function handleListCommand(ctx: Context): Promise<string> {
    try {
        const response: AxiosResponse<PaissaRespone> = await axios.get("https://paissadb.zhu.codes/worlds/33")
        const data: PaissaRespone = response.data

        const freePlots: PlotModel[] = []

        for (const district of data.districts) {
            for (const plot of district.open_plots) {
                if (plot.size === 2 && (plot.lotto_phase === 1 || plot.lotto_phase === 3) && (plot.purchase_system & LOTTERY_MASK) !== 0 && (plot.purchase_system & INDIVIDUAL_MASK) !== 0) {
                    freePlots.push({
                        district: district.name,
                        ward: plot.ward_number + 1,
                        plot: plot.plot_number + 1,
                        lotto_entries: plot.lotto_entries
                    })
                }
            }
        }

        if (freePlots.length === 0) {
            return "Keine freien Häuser!!"
        } else {
            let answer: string = ""
            for (const plot of freePlots) {
                answer += `${plot.district}-W${plot.ward}-${plot.plot} -- ${plot.lotto_entries}\n`
            }
            return answer
        }
    } catch (error) {
        console.log(error)
    }
}