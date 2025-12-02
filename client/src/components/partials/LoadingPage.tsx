import {DotLottieReact} from "@lottiefiles/dotlottie-react";

const LoadingPage = () => {
    return (
        <div className="fixed flex items-center justify-center inset-0 w-screen h-screen">
            <div className="w-full h-full bg-black/50 z-50">
            </div>
            <div className="absolute flex flex-col items-center justify-center w-4/6 sm:w-1/4 h-1/3 bg-white p-10 rounded-lg z-50">
                <DotLottieReact
                src="/assets/Liquid 4 Dot Loader.lottie"
                loop
                autoplay
                />
            </div>
        </div>
    )
}

export default LoadingPage;