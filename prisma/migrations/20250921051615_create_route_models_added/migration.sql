-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "email_verified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."jobs" (
    "id" TEXT NOT NULL,
    "no" SERIAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Waiting for Analysis',
    "user_id" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "dateSurveyed" TIMESTAMP(3) NOT NULL,
    "jobNumber" TEXT NOT NULL,
    "poNumber" TEXT,
    "woNumber" TEXT,
    "reportNumber" TEXT,
    "jobDescription" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "inspector" TEXT NOT NULL,
    "analyst" TEXT,
    "reviewer" TEXT,
    "dateFinished" TIMESTAMP(3),
    "inspectionRoute" TEXT NOT NULL,
    "equipmentUse" TEXT NOT NULL,
    "dateRegistered" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "yearWeekNumber" TEXT NOT NULL,
    "reportIntroduction" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."area" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."equipmentgroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "areaId" TEXT,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "equipmentgroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."equipmentname" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "groupId" TEXT,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "equipmentname_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."component" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "equipmentNameId" TEXT,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."routes" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "routeName" TEXT NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."route_machine_list" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "areaId" TEXT,
    "equipmentGroupId" TEXT,

    CONSTRAINT "route_machine_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."route_equipment_name" (
    "id" TEXT NOT NULL,
    "routeMachineId" TEXT NOT NULL,
    "equipmentNameId" TEXT NOT NULL,

    CONSTRAINT "route_equipment_name_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."route_component" (
    "id" TEXT NOT NULL,
    "routeMachineId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "routeEquipmentId" TEXT NOT NULL,

    CONSTRAINT "route_component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."route_component_comment" (
    "id" TEXT NOT NULL,
    "routeComponentId" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "route_component_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."route_component_recommendation" (
    "id" TEXT NOT NULL,
    "routeComponentId" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "route_component_recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."route_component_temperature" (
    "id" TEXT NOT NULL,
    "routeComponentId" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "route_component_temperature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."route_component_oil_analysis" (
    "id" TEXT NOT NULL,
    "routeComponentId" TEXT NOT NULL,
    "analysis" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "route_component_oil_analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."route_component_action" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "woNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "route_component_action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."route_component_note" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "analyst" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "route_component_note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."route_component_details" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "header" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "route_component_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."route_component_Details" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "route_component_Details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RouteComponentFigures" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "figures" TEXT NOT NULL,

    CONSTRAINT "RouteComponentFigures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "public"."users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "jobs_no_key" ON "public"."jobs"("no");

-- CreateIndex
CREATE UNIQUE INDEX "jobs_jobNumber_key" ON "public"."jobs"("jobNumber");

-- AddForeignKey
ALTER TABLE "public"."jobs" ADD CONSTRAINT "jobs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."jobs" ADD CONSTRAINT "jobs_inspectionRoute_fkey" FOREIGN KEY ("inspectionRoute") REFERENCES "public"."routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."equipmentgroup" ADD CONSTRAINT "equipmentgroup_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "public"."area"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."equipmentname" ADD CONSTRAINT "equipmentname_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."equipmentgroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."component" ADD CONSTRAINT "component_equipmentNameId_fkey" FOREIGN KEY ("equipmentNameId") REFERENCES "public"."equipmentname"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."routes" ADD CONSTRAINT "routes_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_machine_list" ADD CONSTRAINT "route_machine_list_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "public"."routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_machine_list" ADD CONSTRAINT "route_machine_list_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "public"."area"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_machine_list" ADD CONSTRAINT "route_machine_list_equipmentGroupId_fkey" FOREIGN KEY ("equipmentGroupId") REFERENCES "public"."equipmentgroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_equipment_name" ADD CONSTRAINT "route_equipment_name_routeMachineId_fkey" FOREIGN KEY ("routeMachineId") REFERENCES "public"."route_machine_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_equipment_name" ADD CONSTRAINT "route_equipment_name_equipmentNameId_fkey" FOREIGN KEY ("equipmentNameId") REFERENCES "public"."equipmentname"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_component" ADD CONSTRAINT "route_component_routeMachineId_fkey" FOREIGN KEY ("routeMachineId") REFERENCES "public"."route_machine_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_component" ADD CONSTRAINT "route_component_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "public"."component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_component" ADD CONSTRAINT "route_component_routeEquipmentId_fkey" FOREIGN KEY ("routeEquipmentId") REFERENCES "public"."route_equipment_name"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_component_comment" ADD CONSTRAINT "route_component_comment_routeComponentId_fkey" FOREIGN KEY ("routeComponentId") REFERENCES "public"."route_component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_component_recommendation" ADD CONSTRAINT "route_component_recommendation_routeComponentId_fkey" FOREIGN KEY ("routeComponentId") REFERENCES "public"."route_component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_component_temperature" ADD CONSTRAINT "route_component_temperature_routeComponentId_fkey" FOREIGN KEY ("routeComponentId") REFERENCES "public"."route_component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_component_oil_analysis" ADD CONSTRAINT "route_component_oil_analysis_routeComponentId_fkey" FOREIGN KEY ("routeComponentId") REFERENCES "public"."route_component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_component_action" ADD CONSTRAINT "route_component_action_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_component_action" ADD CONSTRAINT "route_component_action_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "public"."component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_component_note" ADD CONSTRAINT "route_component_note_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_component_note" ADD CONSTRAINT "route_component_note_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "public"."component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_component_details" ADD CONSTRAINT "route_component_details_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_component_details" ADD CONSTRAINT "route_component_details_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "public"."component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_component_Details" ADD CONSTRAINT "route_component_Details_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."route_component_Details" ADD CONSTRAINT "route_component_Details_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "public"."component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RouteComponentFigures" ADD CONSTRAINT "RouteComponentFigures_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RouteComponentFigures" ADD CONSTRAINT "RouteComponentFigures_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "public"."component"("id") ON DELETE CASCADE ON UPDATE CASCADE;
