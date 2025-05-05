import AboutHero from "@/components/Organisms/AboutHero";
import MissionStatement, { Value } from "@/components/Organisms/MissionStatement";
import TeamShowcase, { TeamMember } from "@/components/Organisms/TeamShowcase";
import CommunitySpotlight, { Highlight } from "@/components/Organisms/CommunitySpotlight";
import Timeline, { Milestone } from "@/components/Organisms/Timeline";
import JoinUsBanner from "@/components/Organisms/JoinUsBanner";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  // For arrays/objects, use t(key, { returnObjects: true }) and cast to correct types
  const values = t("aboutPage.missionSection.values", { returnObjects: true }) as Value[];
  const team = t("aboutPage.teamSection.members", { returnObjects: true }) as TeamMember[];
  const highlights = t("aboutPage.communitySection.highlights", { returnObjects: true }) as Highlight[];
  const milestones = t("aboutPage.timelineSection.milestones", { returnObjects: true }) as Milestone[];

  return (
    <div className="flex flex-col gap-16 py-8 px-4 max-w-6xl mx-auto">
      <AboutHero
        logo="https://wallpapercave.com/wp/wp7916843.jpg"
        title={t("aboutPage.hero.title")}
        tagline={t("aboutPage.hero.tagline")}
      />
      <MissionStatement
        mission={t("aboutPage.missionSection.mission")}
        vision={t("aboutPage.missionSection.vision")}
        values={values}
      />
      <TeamShowcase
        team={team}
      />
      <CommunitySpotlight
        highlights={highlights}
      />
      <Timeline
        milestones={milestones}
      />
      <JoinUsBanner
        message={t("aboutPage.joinUsBanner.message")}
        buttonText={t("aboutPage.joinUsBanner.buttonText")}
        buttonUrl="https://github.com/your-org/your-repo"
      />
    </div>
  );
}
  