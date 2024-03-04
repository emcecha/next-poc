'use server'

import {IRouteData} from "@/models/route-data.model";

export async function getPage(routeData: IRouteData) {
    const { pageId, pageType, locale, modelId, model } = routeData;
    const pageResponse = await fetch(
        `https://api.kidaroo.pl/pages/${pageId}?expand=sections,meta,relatedPaths`,
        {cache: 'no-store', headers: { 'Accept-Language': locale }}
    );
    const page = await pageResponse.json();
    let modelData;
    if (model && modelId && endpoints[model]) {
        const modelResponse = await fetch(
            endpoints[model](modelId),
            {cache: 'no-store', headers: { 'Accept-Language': locale }},
        )
        modelData = await modelResponse.json();
    }
    return {
        ...page,
        ...(modelData ? {
            relatedPaths: modelData.relatedPaths,
            meta: modelData.meta,
            breadcrumbs: modelData.breadcrumbs,
            pathname: modelData.pathname,
        } : {})
    };
}

const endpoints: Record<string, any> = {
    product: (productId: string | number) => `https://api.kidaroo.pl/products/${productId}?expand=relatedPaths,meta,breadcrumbs,pathname`,
}