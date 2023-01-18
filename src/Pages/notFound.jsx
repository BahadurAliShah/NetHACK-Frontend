import React from "react";

export default function NotFound() {
    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
            <div className="flex min-h-full flex-col bg-white pt-16 pb-12">
                <main className="m-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-6 lg:px-8 py-32">
                    <div className="text-center">
                        <p className="text-base font-semibold text-indigo-600">404</p>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not
                            found.</h1>
                        <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking
                            for.</p>
                        <div className="mt-6">
                            <a href="/interfaces" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                                Go back home
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
