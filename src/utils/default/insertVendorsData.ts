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

   for (const vendor of vendorsData) {
      const vendorBody: CreateVendorBody = {
         brandName: vendor.brand_name,
         brandLogo: vendor.brand_logo,
         location: vendor.location,
         description: vendor.description,
         email: vendor.email,
         phone: vendor.phone,
         ownerId: userIds[Math.floor(Math.random() * userIds.length)].id,
      }

      try {
         await createVendorModel(vendorBody)
         console.log(`Vendor ${vendor.brand_name} inserted successfully.`)
      } catch (error) {
         console.error(`Error inserting vendor ${vendor.brand_name}:`, error)
      }
   }
}