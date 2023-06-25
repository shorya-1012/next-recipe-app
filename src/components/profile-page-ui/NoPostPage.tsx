import { TfiFaceSad } from "react-icons/tfi"

type Props = {}

const NoPostPage = (props: Props) => {
    return (
        <div className="w-screen min-h-[50vh] bg-dark-body text-red-900 mt-10">
            <div className="flex flex-col w-full h-full items-center">
                <div className="mb-5">
                    <TfiFaceSad size={200} />
                </div>
                <div>
                    <h2 className="text-3xl font-righteous">No Posts Yet.</h2>
                </div>
            </div>
        </div>
    )
}

export default NoPostPage