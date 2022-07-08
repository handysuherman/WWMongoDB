import React, { useRef } from 'react';
import Typed from 'react-typed';


const Chats = (props) => {
    const search = (s) => {
        props.setFilters({
            ...props.filters,
            s,
            page: 1
        });
    }

    const sort = (sort) => {
        props.setFilters({
            ...props.filters,
            sort,
            page: 1
        });

    }

    const load = () => {
        props.setFilters({
            ...props.filters,
            page: props.filters.page + 1
        });

    }

    let button;

    if (props.filters.page !== props.lastPage) { 
        button = (
            <div className='d-flex justify-content-center mt-4'>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={load}>
                Drop more
                </button>
            </div>
        )
    }

    return (
     <>
   
     <div className='flex justify-center items-center'>
        <Typed 
            className='md:text-4xl sm:text-4xl text-xl font-bold pl-2 font-mono'
            strings={['Wikan History Chats']}
            typeSpeed={60}
            backSpeed={90}
            loop
        />

     </div>
        
    <div class="overflow-auto rounded-lg shadow hidden md:block">
    <div className="col-md-12 mb-4 input-group mx-auto w-max ">
            <input type="text" className="form-control peer cursor-pointer relative z-10 h-12 w-12 rounded-full border pl-10 outline-none focus:border-lime-300 focus:pl-16 focus:pr-4" placeholder='Search..'
                onChange={e => search(e.target.value)}
            />
            <div className='input-group-append'>
                <select className='form-select inline-flex justify-center w--15 h-12 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500' onChange={e => sort(e.target.value)}>
                    <option>Select</option>
                    <option value="asc">Terbaru</option>
                    <option value="desc">Terlama</option>
                </select>
            </div>
        </div>
        <table class="w-full border-separate border-spacing-2 border-slate-500">
        <thead class="bg-gray-50 border-b-2 border-gray-200">
            <tr>
            <th class="w-6 p-3 text-sm font-semibold tracking-wide text-left">Nama</th>
            <th class="w-22 p-3 text-sm font-semibold tracking-wide text-left">Pesan</th>
            <th class="w-6 p-2 text-sm font-semibold tracking-wide text-left">No.HP</th>
            <th class="w-6 p-3 text-sm font-semibold tracking-wide text-left">Received</th>            
            </tr>
        </thead>
            {props.chats.map(chat => {
                var timeU = chat.time
                var dates = new Date( Date.parse(timeU));
                return (
                    <tbody class="divide-y divide-gray-100 text-ellipsis overflow-hidden">
                    <tr class="bg-white">
                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                            <a href="#" class="font-bold text-blue-500 capitalize hover:underline">{chat.nama}</a>
                        </td>
                        <td class="p-3 text-sm break-word flex-wrap text-gray-700 whitespace-nowrap">
                            {chat.text}
                        </td>
                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span
                            class="p-1.5 text-xs uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 font-bold">{chat.nomor}</span>
                        </td>
                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{('0' + dates.getDate()).slice(-2) + '/' + ('0' + (dates.getMonth() + 1)).slice(-2) + '/' + dates.getFullYear() + ' ' + ('0' + dates.getHours()).slice(-2) + ':' + ('0' + dates.getMinutes()).slice(-2)}</td>
                    </tr>
                    </tbody>
                    
                
            )
        })}
                    
        </table>
        {button}
       </div>
     

       
       <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
       <div className="col-md-12 mb-4 input-group mx-auto w-15 ">
            <input type="text" className="form-control peer cursor-pointer relative z-10 h-12 w-12 rounded-full border pl-12 outline-none focus:border-lime-300 focus:pl-16 focus:pr-4" placeholder='Search..'
                onChange={e => search(e.target.value)}
            />
            <div className='input-group-append'>
                <select className='form-select inline-flex justify-center w-15 h-12 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500' onChange={e => sort(e.target.value)}>
                    <option>Select</option>
                    <option value="asc">Terbaru</option>
                    <option value="desc">Terlama</option>
                </select>
            </div>
        </div>
       
       {props.chats.map(chat => {
                var timeU = chat.time
                var dates = new Date( Date.parse(timeU));
                return (
                    <div class="bg-white space-y-3 p-4 rounded-lg shadow">
                        <div class="flex items-center space-x-2 text-sm">
                        <div>
                            <a href="#" class="text-blue-500 font-bold capitalize hover:underline">{chat.nama}</a>
                        </div>
                        <div class="text-gray-500"></div>
                        <div>
                        <span
                            class="p-1.5 text-xs font-bold uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{chat.nomor}</span>
                        </div>

            </div>
            <div class="text-sm text-gray-700">
            {chat.text}
            </div>
            <div class="text-sm font-medium text-black">
            {('0' + dates.getDate()).slice(-2) + '/' + ('0' + (dates.getMonth() + 1)).slice(-2) + '/' + dates.getFullYear() + ' ' + ('0' + dates.getHours()).slice(-2) + ':' + ('0' + dates.getMinutes()).slice(-2)}
            </div>
        </div>
       

                    
                )
       })}
       {button}
       </div>
    </>
    );
};

export default Chats;