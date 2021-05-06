import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import axios from "axios";
import Table from "./Table";



const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

export default function App() {
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  let t = 0
  useEffect(() => {
    const interval = setInterval(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          t += res.data[i].market_cap
        }
        setUsers(res.data);
        setLoading(false);
        setTotal(t);

      });
  }, 2000)
  return () =>clearInterval(interval)
 }, []);
 
  const columns = useMemo(
    () => [
      {
        Header: "Rank",
        accessor: "market_cap_rank"
      },
      {
        Header: "Icon",
        accessor: "image",
        Cell: ({ cell: { value } }) => {
          const url = value
          return (
            <>
            <img 
              src={url}
              alt="new"
              width="50"
              height="50"
            />
            </>
          )
       },
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Symbol",
        accessor: "symbol"
      },

      {
        Header: "Price",
        accessor: "current_price",
        Cell: ({ cell: { value } }) => {
          const usdPrice = value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
          return (
            <>
            {usdPrice}
            </>
          )
      },
    },
    {
      Header: "% change in 24 hours",
      accessor: "price_change_percentage_24h",
      Cell: ({ cell: { value } }) => {
        const newP = value.toFixed(3) + "%";
          return (
            <>
            {newP}
            </>
          )
      },
    },
    {
      Header: "All-time High ",
      accessor: "ath",
      Cell: ({ cell: { value } }) => {
        const usdP = value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
          return (
            <>
            {usdP}
            </>
          )
      },
    },
    {
      Header: "# days since ATH",
      accessor: "ath_date",
      Cell: ({ cell: { value } }) => {
        const athDate = new Date(value).getTime();
        const today = new Date().getTime()  
          return (
             `${Math.round((today - athDate)/(1000*60*60*24))} days`
          );
        }
      },
      {
        Header: "Market Cap and % of Total Market Cap",
        accessor: "market_cap",
        Cell: ({ cell: { value } }) => {
       
          const ptt = (value / t)
          const p = (ptt*100).toFixed(3)+ "%"
       
          return (
            <>
             {value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              <br></br>
              <br></br> 
              {p}
          </>
            
          );
        
        } 
      }  
    ],
    [] 
  );

  return (

       <Styles>
      <Table columns={columns} data={users} loading={loading} total={total} />;
   
    </Styles>
  
  );
}