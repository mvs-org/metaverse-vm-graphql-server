export const AddressResolver = async (_parent: any = {}, { address }: { address: string }) => {
    return { address,}
}