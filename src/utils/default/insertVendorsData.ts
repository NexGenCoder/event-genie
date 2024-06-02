import { vendorsData } from '../../data/vendors'
import { getUsersIds } from '../../models/user'
import { createVendorModel } from '../../models/vendor'
import { CreateVendorBody } from '../../types/vendor'

export const insertVendorsDummyData = async () => {
   const userIds = await getUsersIds()

   if (userIds.length === 0) {
      console.error('No user IDs found in the users table.')
      return
   }

   for (let i = 0; i <= 9; i++) {
      const vendor = vendorsData[i]
      const vendorBody: CreateVendorBody = {
         brandName: vendor.brand_name,
         brandLogo: vendor.brand_logo,
         location: vendor.location,
         description: vendor.description,
         email: vendor.email,
         phone: vendor.phone,
         ownerId: userIds[i].userid,
      }

      try {
         await createVendorModel(vendorBody)
      } catch (error) {
         console.error(`Error inserting vendor ${vendor.brand_name}:`, error)
      }
   }
}
