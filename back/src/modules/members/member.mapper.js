function mapMember(member){

return {

    id: member.id,

    first_name: member.first_name,

    last_name: member.last_name,

    phone: member.phone,

    email: member.email,

    entry_date: member.entry_date,

    exit_date: member.exit_date,

    user_id: member.user_id,

    created_at: member.created_at,
    created_by: member.created_by,
    updated_at: member.updated_at,
    updated_by: member.updated_by,
    deleted_at: member.deleted_at,
    deleted_by: member.deleted_by,

    status:{
    code:member.status_code,
    label:member.status_label
},

group:{
    name:member.group_name
},


    subscription:
        member.subscription_amount
        ?
        {

            amount:
            member.subscription_amount,

            frequency:
            member.subscription_frequency,

            start_date:
            member.subscription_start_date

        }
        :
        null

}
}


module.exports = mapMember;