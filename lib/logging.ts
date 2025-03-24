let currentDateTime = new Date();
export const info = (message: any)=>{
    console.info(currentDateTime,message);
}

export const error = (message: any)=>{
    console.error(currentDateTime,message);
}

export const warn = (message: any)=>{
    console.warn(currentDateTime,message);
}

export const debug = (message: any)=>{
    console.debug(currentDateTime,message);
}
export const log = (message: any)=>{
    console.log(currentDateTime,message);
}