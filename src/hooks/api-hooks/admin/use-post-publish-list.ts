export type PostPublishRequest = {
    tender_no: number,
    tender_date: Date,
    season: string,
    grade: string,
    quantal: number,
    lifting_date: Date,
    purchase_rate: number,
    mill_rate: number,
    mc: number,
    pt: number,
    item_code: number,
    ic: number,
    tender_id: number,
    td: number,
    unit:"Q"| "M" | "L",
    sale_rate: number,
    publish_quantal: number,
    multiple_of: number,
    auto_confirm: "Y" | "N",
    tender_do: number,
    type: "F" | "P",
    mill_code: number,
    payment_to: number,
    mill_short_name: string,
    item_name: string
}

export type PostPublishRespose = {

}