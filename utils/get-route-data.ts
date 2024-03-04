'use server'

import routes from '@/routes.json';
import {IRouteData} from "@/models/route-data.model";

export async function getRouteData(path: string[] | undefined) {
    let route;
    if (!path) {
        route = routes['/'];
    } else {
        // @ts-ignore
        route = routes[`/${path.join('/')}`]
    }
    const [locale, pageType, pageId, model, modelId] = route.split('.');
    return {
        locale,
        pageType,
        pageId,
        model,
        modelId,
    } as IRouteData;
}