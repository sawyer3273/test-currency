import { http } from '@/shared/api'
import { ExchangeRates } from '../model/types'
import { FetchData } from '@/shared/types/common'

export const getCurrencies = async (): Promise<FetchData<ExchangeRates>> => {
  try {
    let result = (await http.get(`https://status.neuralgeneration.com/api/currency`))
    return {
      success: true,
      data: result.data
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'error',
    }
  }
 
  
}
