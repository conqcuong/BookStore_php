import React, { useEffect, useState } from 'react'
import {BookCards} from './BookCards';

export const BestSellerBooks = () => {
  return (
    <div>
        <BookCards books={"Book1"} headline={"Best Seller Books"}/>
    </div>
  )
}
