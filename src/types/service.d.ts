export type IServiceType = {
   id: string
   name: string
   description: string
   image_url: string
}

export type prices = {
   priceid: string
   serviceid: string
   per_hour: string
   per_day: string
   per_week: string
   per_month: string
   created_at: string
   updated_at: string
}
export type IService = {
   serviceid: string
   name: string
   description: string
   image_url: string
   service_type_id: string
   vendorid: string
   priceid: string
   created_at?: string
   updated_at?: string
}
