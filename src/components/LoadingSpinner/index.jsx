import { RotatingLines } from "react-loader-spinner"
import './LoadingSpinner.css'

export default function LoadingSpinner() {
    return (
        <div className="loading-spinner">
            <RotatingLines
                strokeColor="#98aed3"
                height="40"
                width="40"
            />
        </div>
    )
}